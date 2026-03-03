import { afterEach, describe, expect, it, vi } from "vitest";

describe("server export for Vercel", () => {
  const originalEnv = process.env.VERCEL;

  afterEach(() => {
    process.env.VERCEL = originalEnv;
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("exports the Express app without starting a listener when Vercel sets VERCEL=1", async () => {
    const listenMock = vi.fn();

    vi.doMock("express", () => {
      const mockApp = Object.assign(() => null, {
        use: vi.fn(),
        post: vi.fn(),
        get: vi.fn(),
        set: vi.fn(),
        listen: listenMock
      });
      const expressFn = () => mockApp;
      expressFn.static = vi.fn(() => vi.fn());

      return { __esModule: true, default: expressFn };
    });

    process.env.VERCEL = "1";
    const { default: app } = await import("../../server.js");

    expect(typeof app).toBe("function");
    expect(listenMock).not.toHaveBeenCalled();
  });
});
