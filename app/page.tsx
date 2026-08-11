"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [input, setInput] = useState("");
  // const [messages, setMessages] = useState<Message[]>([]);
  const { messages, sendMessage } = useChat();

  // const fetchData = async (messages: Message[]) => {
  //   try {
  //     const response = await fetch("/api/chat", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ messages }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();

  //     const assistantMessage: Message = {
  //       id: Date.now().toString(),
  //       role: "assistant",
  //       content: data.message,
  //     };

  //     setMessages((prevMessages) => [...prevMessages, assistantMessage]);
  //   } catch (error) {
  //     console.error("Error sending messages:", error);
  //   }
  // };

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    // const userMessage: Message = {
    //   id: Date.now().toString(),
    //   role: "user",
    //   content: input,
    // };
    // const updatedMessages = [...messages, userMessage];

    // setMessages(updatedMessages);

    setInput("");

    await sendMessage({ text: input });
  };

  return (
    <main className="flex justify-center h-screen bg-gray-50">
      <div className="chat flex flex-col h-full w-full max-w-3xl">
        <div className="chat__conversation flex-1 overflow-y-auto flex flex-col gap-3 p-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat__message max-w-[75%] rounded-2xl px-4 py-2 leading-relaxed ${
                message.role === "user"
                  ? "self-end bg-blue-500 text-white"
                  : "self-start bg-gray-200 text-gray-900"
              }`}
            >
              {/* {message.role === "user" ? "You: " : "Assistant: "} */}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return <ReactMarkdown key={`${message.id}-${i}`}>{part.text}</ReactMarkdown>;
                }
              })}
            </div>
          ))}
        </div>
        <div className="chat__inputArea w-full max-w-3xl p-4 mx-auto">
          <form
            className="chat__inputForm flex items-center gap-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              className="chat__input border border-gray-400 rounded-md p-2 w-full px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-md p-2 px-4 hover:bg-blue-600 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
