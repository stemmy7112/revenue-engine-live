# Revenue Engine

Revenue Engine is a React + Vite frontend with an Express backend for Stripe checkout and AI-powered document generation.

## Tech Stack

- Vite
- React + TypeScript
- Tailwind + shadcn/ui
- Express
- Stripe
- OpenAI

## Local Setup

1. Install dependencies:

```sh
npm install
```

2. Create local environment variables:

```sh
cp .env.example .env
```

3. Fill in required server values in `.env`:

- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ONE_TIME`
- `STRIPE_PRICE_SUB`
- `OPENAI_API_KEY`

4. Start backend:

```sh
npm run start
```

5. In a second terminal, start frontend:

```sh
npm run dev
```

## Frontend/Backend Routing in Dev

- Frontend runs on `http://localhost:8080`
- Backend runs on `http://localhost:10000`
- Vite proxies `/api/*` to backend, so frontend calls should use `/api/...` by default

If your frontend is hosted separately, set `VITE_API_BASE_URL` to your backend origin.

## API Endpoints

- `GET /health` - health status + integration availability
- `POST /create-checkout-session` - creates Stripe checkout session
- `POST /webhook` - Stripe webhook receiver
- `POST /generate` - gated OpenAI PDF generation endpoint

## Stripe Notes

- Checkout success redirects to `/success`
- Checkout cancel redirects to `/cancel`
- Use Stripe CLI for local webhook forwarding:

```sh
stripe listen --forward-to localhost:10000/webhook
```

## Security

- Do not commit real keys into repository files
- Rotate keys immediately if they were exposed
- Keep `.env` local only
