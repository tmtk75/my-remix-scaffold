import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .url()
    .refine((url) => url.endsWith("example")),

  AWS_REGION: z.string().default("us-east-1"),

  AWS_ENDPOINT_URL: z.string().url().default("http://localhost:4566"),
});

export const env = envSchema.parse(process.env);
