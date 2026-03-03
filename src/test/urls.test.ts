import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { DEFAULT_DEV_URL, resolveAppBaseUrl, resolveViteUrl } from "../../config/urls.js";

const ORIGINAL_ENV = { ...process.env };

beforeEach(() => {
  process.env = { ...ORIGINAL_ENV };
  delete process.env.APP_BASE_URL;
  delete process.env.VITE_API_BASE_URL;
});

afterAll(() => {
  process.env = ORIGINAL_ENV;
});

describe("resolveAppBaseUrl", () => {
  it("prefers the origin header when provided", () => {
    process.env.APP_BASE_URL = "https://env-app.example.com";
    expect(resolveAppBaseUrl("https://header.example.com")).toBe("https://header.example.com");
  });

  it("uses APP_BASE_URL when no origin is provided", () => {
    process.env.APP_BASE_URL = "https://env-app.example.com";
    expect(resolveAppBaseUrl()).toBe("https://env-app.example.com");
  });

  it("falls back to the Vite dev URL when nothing is configured", () => {
    expect(resolveAppBaseUrl()).toBe(DEFAULT_DEV_URL);
  });
});

describe("resolveViteUrl", () => {
  it("returns the Vite API base URL when it is configured", () => {
    process.env.VITE_API_BASE_URL = "https://api.example.com";
    expect(resolveViteUrl()).toBe("https://api.example.com");
  });

  it("falls back to APP_BASE_URL when VITE_API_BASE_URL is missing", () => {
    process.env.APP_BASE_URL = "https://env-app.example.com";
    expect(resolveViteUrl()).toBe("https://env-app.example.com");
  });

  it("returns the default Vite dev URL when nothing is set", () => {
    expect(resolveViteUrl()).toBe(DEFAULT_DEV_URL);
  });
});
