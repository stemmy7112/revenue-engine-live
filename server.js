import express from "express";
import rateLimit from "express-rate-limit";
import Stripe from "stripe";
import OpenAI from "openai";
import PDFDocument from "pdfkit";
import bodyParser from "body-parser";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";

const app = express();
app.use(express.static("public"));

app.use("/webhook", bodyParser.raw({ type: "application/json" }));
app.use(bodyParser.json());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PRICE_ONE_TIME = process.env.STRIPE_PRICE_ONE_TIME;
const PRICE_SUB = process.env.STRIPE_PRICE_SUB;

if (!PRICE_ONE_TIME || !PRICE_SUB) {
  throw new Error(
    "Missing Stripe price IDs. Please set STRIPE_PRICE_ONE_TIME and STRIPE_PRICE_SUB environment variables."
  );
}
let subscriptions = {};
let singlePurchases = {};

const generateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: { error: "Too many requests, please try again later." }
});

app.post("/create-checkout-session", async (req, res) => {
  const { type } = req.body;
  const priceId = type === "sub" ? PRICE_SUB : PRICE_ONE_TIME;

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: type === "sub" ? "subscription" : "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${req.headers.origin}/success.html`,
    cancel_url: `${req.headers.origin}/`
  });

  res.json({ id: session.id });
});

app.post("/webhook", (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.mode === "payment") {
      singlePurchases[session.customer_email] = true;
    }

    if (session.mode === "subscription") {
      subscriptions[session.customer_email] = true;
    }
  }

  res.json({ received: true });
});

app.post("/generate", generateLimiter, async (req, res) => {
  const { email, content, letterType } = req.body;

  if (!singlePurchases[email] && !subscriptions[email]) {
    return res.status(403).json({ error: "Payment required" });
  }

  try {
    const prompt = `Write a professional ${letterType}. Details: ${content}`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }]
    });

    const text = completion.choices[0].message.content;

    const doc = new PDFDocument();
    const filePath = `./${uuidv4()}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));
    doc.fontSize(12).text(text);
    doc.end();

    doc.on("finish", () => {
      res.download(filePath, () => {
        fs.unlink(filePath, (err) => {
          if (err) console.error("Failed to delete PDF:", err);
        });
      });
    });
  } catch (err) {
    console.error("Generate error:", err);
    res.status(500).json({ error: "Failed to generate document" });
  }
});

app.listen(process.env.PORT || 10000, () => console.log("Server running"));
