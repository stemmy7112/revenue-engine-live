// Vite dev server is configured to run on port 8080 (see vite.config.ts)
export const DEFAULT_DEV_URL = "http://localhost:8080";

export const resolveAppBaseUrl = (originHeader) =>
  originHeader || process.env.APP_BASE_URL || DEFAULT_DEV_URL;

export const resolveViteUrl = () =>
  process.env.VITE_API_BASE_URL || process.env.APP_BASE_URL || DEFAULT_DEV_URL;
