import { createEnv } from "@t3-oss/env-nextjs";
import { type ZodError, z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    BASE_URL: z.string().url(),
  },
  emptyStringAsUndefined: true,
  experimental__runtimeEnv: process.env,
  onValidationError: (error: ZodError) => {
    console.error(
      "❌ Invalid environment variables",
      error.flatten().fieldErrors,
    );
    process.exit(1);
  },
});
