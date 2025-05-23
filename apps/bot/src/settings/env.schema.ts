import { z } from "zod";

export const envSchema = z.object({
    BOT_TOKEN: z.string({ description: "Discord Bot Token is required" }).min(1),
    WEBHOOK_LOGS_URL: z.string().url().optional(),
    MONGO_URI: z.string({ description: "MongoDb URI is required" }).min(1),
    // Env vars...
});