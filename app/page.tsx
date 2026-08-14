"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatLoadingIndicator } from "@/components/chat/ChatLoadingIndicator";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    setInput("");

    await sendMessage({ text: input });
  };

  return (
    <main
      className="flex justify-center h-screen bg-mist-900 overflow-y-auto 
      scrollbar-thin scrollbar-thumb-mist-700 scrollbar-track-mist-900"
    >
      <div className="chat flex flex-col w-full max-w-3xl">
        <div
          className={`chat__conversation flex-1 flex flex-col gap-3 p-4 pb-26 focus-within:outline-none 
          ${!messages.length ? "justify-center" : ""} `}
        >
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {status === "submitted" && <ChatLoadingIndicator />}
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          hasMessages={!!messages.length}
          onSubmit={handleSubmit}
        />
      </div>
    </main>
  );
}
