import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { z } from "zod";
import { gpt } from "~/gpt";

export const gptRouter = createTRPCRouter({
  question: publicProcedure
    .input(z.instanceof(File))
    .mutation(async ({ input }) => {
      const FileCreateResponse = await gpt.files.create({
        file: input,
        purpose: "assistants",
      });
      const Assistant = await gpt.beta.assistants.create({
        name: "研究発表に関する質問生成",
        description: "研究発表の内容から質問生成を行うアシスタント",
        model: "gpt-4o-mini",
      });
      const Thread = await gpt.beta.threads.create({});
      const Message = await gpt.beta.threads.messages.create(Thread.id, {
        role: "user",
        content:
          "PDFファイルとして渡した研究発表の内容から質問を生成してください",
        attachments: [
          {
            file_id: FileCreateResponse.id,
          },
        ],
      });

      const Run = await gpt.beta.threads.runs.create(Thread.id, {
        assistant_id: Assistant.id,
      });
      const response = await gpt.beta.threads.runs.retrieve(Thread.id, Run.id);
      if (response.status === "completed") {
        const messages = await gpt.beta.threads.messages.list(Thread.id);
        const assistant_msgs = messages.data.filter(
          (msg) => msg.role === "assistant",
        );
        const response = assistant_msgs.pop();
        const result = response?.content.filter((msg) => msg.type === "text");
        const question = result?.map((msg) => msg.text.value).join("\n");
        return {
          question: question ?? "質問が生成できませんでした",
        };
      }
    }),
});
