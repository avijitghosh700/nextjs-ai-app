"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

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
    <main>
      <div className="chat">
        <div className="chat__conversation">
          {messages.map((message) => (
            <div key={message.id} className="chat__message">
              {message.role === "user" ? "You: " : "Assistant: "}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return <p key={`${message.id}-${i}`}>{part.text}</p>;
                }
              })}
            </div>
          ))}
        </div>
        <div className="chat__inputArea w-full max-w-100 p-4">
          <form
            className="chat__inputForm flex items-center gap-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              className="chat__input border border-gray-400 rounded-md p-2 w-full"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white rounded-md p-2">
              Send
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
