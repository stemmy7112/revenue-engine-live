import { afterEach, describe, expect, it, vi } from "vitest";

describe("server export for Vercel", () => {
  const originalEnv = process.env.VERCEL;
  const originalPort = process.env.PORT;

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.VERCEL;
    } else {
      process.env.VERCEL = originalEnv;
    }

    if (originalPort === undefined) {
      delete process.env.PORT;
    } else {
      process.env.PORT = originalPort;
    }
    vi.resetModules();
    vi.clearAllMocks();
  });

  it("exports the Express app without starting a listener when Vercel sets VERCEL=1", async () => {
    const listenMock = vi.fn();
    const useMock = vi.fn();
    const postMock = vi.fn();
    const getMock = vi.fn();

    vi.doMock("express", () => {
      const mockApp = Object.assign(() => null, {
        use: useMock,
        post: postMock,
        get: getMock,
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
    expect(getMock).toHaveBeenCalledWith("/api/health", expect.any(Function));
    expect(getMock).toHaveBeenCalledWith("/api/stack", expect.any(Function));
    expect(postMock).toHaveBeenCalledWith("/api/create-checkout-session", expect.any(Function));
    expect(postMock).toHaveBeenCalledWith("/api/webhook", expect.any(Function));
    expect(postMock).toHaveBeenCalledWith("/api/generate", expect.any(Function), expect.any(Function));
  });

  it("starts the server locally when VERCEL is not set", async () => {
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

    delete process.env.VERCEL;
    process.env.PORT = "3001";

    await import("../../server.js");

    expect(listenMock).toHaveBeenCalledWith("3001", expect.any(Function));
  });
});
