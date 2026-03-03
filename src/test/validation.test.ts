import { describe, expect, it } from "vitest";
import { validateGenerateRequest } from "../../validation.js";

describe("validateGenerateRequest", () => {
  it("accepts a well-formed payload", () => {
    const result = validateGenerateRequest({
      email: "user@example.com",
      content: "Please draft a note.",
      letterType: "cover letter",
    });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      email: "user@example.com",
      content: "Please draft a note.",
      letterType: "cover letter",
    });
  });

  it("normalizes trimmed string values", () => {
    const result = validateGenerateRequest({
      email: " user@example.com ",
      content: "  hello ",
      letterType: "  memo ",
    });

    expect(result.success).toBe(true);
    expect(result.data).toEqual({
      email: "user@example.com",
      content: "hello",
      letterType: "memo",
    });
  });

  it("rejects missing or invalid payloads", () => {
    const result = validateGenerateRequest({
      email: "not-an-email",
      content: " ",
      letterType: "",
    });

    expect(result.success).toBe(false);
    expect(result.errors?.length).toBeGreaterThan(0);
  });
});
