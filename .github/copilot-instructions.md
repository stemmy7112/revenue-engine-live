# Copilot coding agent instructions

## Project context
- Full-stack app built with Vite + React/TypeScript frontend and an Express server (see `server.js`) that serves the built `dist/` assets.
- Key commands:
  - Install: `npm install`
  - Develop frontend: `npm run dev`
  - Build: `npm run build`
  - Start API + built frontend: `npm run start`
  - Lint: `npm run lint`
  - Test: `npm test`
- Environment: copy `.env.example` to `.env` and fill Stripe/OpenAI keys; keep secrets out of the repo.

## Quality and verification
- Always run lint + tests for relevant changes, and run `npm run build` before marking work complete to confirm the app bundles.
- Verify the app still serves correctly via `npm run start` after a build; the server should serve `dist/` when present.
- UX requirement: ensure experiences render well on both desktop web browsers and phones (responsive layouts). Spot-check primary pages (landing/auth/checkout flows) in mobile viewport/responsive mode.

## Additional notes
- Stripe webhooks are available at `/webhook` and `/api/webhook`; avoid logging or committing secrets.
- If supabase functions or Stripe checkout are touched, confirm redirects remain correct (`/success`, `/cancel`).
