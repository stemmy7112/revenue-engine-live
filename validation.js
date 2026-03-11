import { z } from "zod";

const generateSchema = z.object({
  email: z.string().trim().email(),
  content: z.string().trim().min(1, "content is required"),
  letterType: z.string().trim().min(1, "letterType is required")
});

export const validateGenerateRequest = (payload) => {
  const result = generateSchema.safeParse(payload ?? {});

  if (!result.success) {
    return {
      success: false,
      errors: result.error.errors.map((err) => err.message)
    };
  }

  return { success: true, data: result.data };
};

export const schemas = {
  generate: generateSchema
};
