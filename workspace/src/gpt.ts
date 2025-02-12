import OpenAI from "openai";
import { env } from "~/env";

const createGPTClient = (apiKey: string) => new OpenAI({ apiKey });

const globalForGpt = globalThis as unknown as {
  gpt: ReturnType<typeof createGPTClient> | undefined;
};

export const gpt = globalForGpt.gpt ?? createGPTClient(env.OPENAI_API_KEY);
if (env.NODE_ENV !== "production") globalForGpt.gpt = gpt;
