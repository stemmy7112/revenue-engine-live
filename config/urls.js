const DEFAULT_FRONTEND_URL = "http://localhost:8080";

export const resolveAppBaseUrl = (originHeader) =>
  originHeader || process.env.APP_BASE_URL || DEFAULT_FRONTEND_URL;

export const resolveViteUrl = () =>
  process.env.VITE_API_BASE_URL || process.env.APP_BASE_URL || DEFAULT_FRONTEND_URL;
