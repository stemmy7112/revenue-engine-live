import { describe, expect, it, vi, afterEach } from "vitest";

describe("server export", () => {
  const originalVercel = process.env.VERCEL;

  afterEach(() => {
    process.env.VERCEL = originalVercel;
    vi.resetModules();
  });

  it("exports an express app for Vercel functions", async () => {
    process.env.VERCEL = "1";
    vi.resetModules();

    const serverModule = await import("../../server.js");

    expect(typeof serverModule.default).toBe("function");
  });
});
