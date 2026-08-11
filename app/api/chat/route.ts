import { google } from "@ai-sdk/google";
import { createUIMessageStreamResponse, streamText, convertToModelMessages, toUIMessageStream, UIMessage } from "ai";

export async function POST(request: Request) {
  const { messages }: { messages: UIMessage[] } = await request.json();

  const { stream } = streamText({
    model: google("gemini-3.6-flash"),
    messages: await convertToModelMessages(messages),
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream }),
  });
}
