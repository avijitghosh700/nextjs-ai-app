"use client";

import { useEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatLoadingIndicator } from "@/components/chat/ChatLoadingIndicator";
import { ChatErrorAlert } from "@/components/chat/ChatErrorAlert";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, sendMessage, status, stop, error, clearError } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isGenerating = status === "submitted" || status === "streaming";

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    clearError();
    setInput("");

    try {
      await sendMessage({ text: input });
    } catch {
      // The hook exposes request and streaming failures through `error` below.
    }
  };

  const handleStop = () => {
    stop();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

          {isGenerating && <ChatLoadingIndicator />}

          {error && <ChatErrorAlert onDismiss={clearError} />}

          <div ref={messagesEndRef} aria-hidden="true" />
        </div>

        <ChatInput
          input={input}
          setInput={setInput}
          isGenerating={isGenerating}
          hasMessages={!!messages.length}
          onSubmit={handleSubmit}
          onStop={handleStop}
        />
      </div>
    </main>
  );
}
