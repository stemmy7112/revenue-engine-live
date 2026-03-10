import fs from "fs";
import path from "path";
import { beforeAll, describe, expect, it } from "vitest";

describe(".env.example", () => {
  const envPath = path.join(process.cwd(), ".env.example");
  let content: string;

  beforeAll(() => {
    content = fs.readFileSync(envPath, "utf8");
  });

  it("should contain required placeholder environment variables", () => {
    expect(content).toContain("STRIPE_SECRET_KEY=sk_test_your_secret_key");
    expect(content).toContain("STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret");
    expect(content).toContain("STRIPE_PRICE_ONE_TIME=price_one_time_id");
    expect(content).toContain("STRIPE_PRICE_SUB=price_sub_id");
    expect(content).toContain("OPENAI_API_KEY=sk-your-openai-key");
  });

  it("should not contain live secret values", () => {
    expect(content).not.toMatch(/sk_live/i);
    expect(content).not.toMatch(/pk_live/i);
    expect(content).not.toMatch(/rk_live/i);
    // OpenAI production keys start with sk- (or sk-proj-/sk-org-) followed by a base64url token,
    // so we allow - and _ in the character class.
    // The placeholder stays intentionally short so it will not trigger this check.
    expect(content).not.toMatch(/(sk-|sk-proj-|sk-org-)[-A-Za-z0-9_]{24,}/);
    // Stripe webhook secrets typically start with whsec_ followed by a base64url token.
    // The placeholder value is shorter than 32 characters, so it won't satisfy this pattern.
    expect(content).not.toMatch(/whsec_[-A-Za-z0-9_]{32,}/);
  });
});
