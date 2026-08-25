import { google } from "@ai-sdk/google";
import {
  createUIMessageStreamResponse,
  streamText,
  convertToModelMessages,
  toUIMessageStream,
  UIMessage,
} from "ai";

export async function POST(request: Request) {
  let messages: UIMessage[];

  try {
    const body: unknown = await request.json();

    if (!body || typeof body !== "object" || !Array.isArray((body as { messages?: unknown }).messages)) {
      return Response.json({ error: "A messages array is required." }, { status: 400 });
    }

    messages = (body as { messages: UIMessage[] }).messages;
  } catch {
    return Response.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  try {
    const { stream } = streamText({
      model: google("gemini-3.6-flash"),
      messages: await convertToModelMessages(messages),
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream }),
    });
  } catch {
    return Response.json({ error: "Unable to start the chat response. Please try again." }, { status: 502 });
  }
}
