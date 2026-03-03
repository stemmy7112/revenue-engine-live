import { afterEach, describe, expect, it, vi } from "vitest";

describe("server export for Vercel", () => {
  const originalEnv = process.env.VERCEL;

  afterEach(() => {
    process.env.VERCEL = originalEnv;
    vi.resetModules();
  });

  it("exports the Express app without starting a listener when Vercel sets VERCEL=1", async () => {
    process.env.VERCEL = "1";
    const { default: app } = await import("../../server.js");

    expect(typeof app).toBe("function");
  });
});
