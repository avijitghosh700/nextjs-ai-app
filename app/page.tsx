"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";
import { Send, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function Home() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChat();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!input.trim()) return;

    setInput("");

    await sendMessage({ text: input });
  };

  const handleCopyCode = (e: React.MouseEvent<HTMLButtonElement>, code: string) => {
    navigator.clipboard.writeText(code.replace(/\n$/, ""));
    const btn = e.currentTarget;
    const original = btn.innerHTML;
    btn.innerHTML = "Copied";
    setTimeout(() => {
      btn.innerHTML = original;
    }, 1500);
  };

  return (
    <main className="flex justify-center h-screen bg-mist-900">
      <div className="chat flex flex-col h-full w-full max-w-3xl">
        <div className="chat__conversation flex-1 scrollbar-none overflow-y-auto flex flex-col gap-3 p-4 pb-26 focus-within:outline-none">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat__message max-w-[75%] rounded-2xl py-3 leading-relaxed ${
                message.role === "user"
                  ? "self-end px-4 bg-gray-600 text-white"
                  : "self-start max-w-full bg-transparent text-white"
              }`}
            >
              {/* {message.role === "user" ? "You: " : "Assistant: "} */}
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case "text":
                    return (
                      <ReactMarkdown
                        key={`${message.id}-${i}`}
                        components={{
                          code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || "");

                            return match ? (
                              <div className="relative my-2 group">
                                <button
                                  type="button"
                                  aria-label="Copy code"
                                  onClick={(e) => handleCopyCode(e, String(children))}
                                  className="absolute right-2 top-2 z-10 rounded-md 
                                  bg-mist-700 px-2 py-1 text-xs text-white opacity-0 
                                  transition-opacity group-hover:opacity-100 hover:bg-mist-500 cursor-pointer"
                                >
                                  <Copy size={16} />
                                </button>
                                <SyntaxHighlighter
                                  language={match[1]}
                                  style={oneDark}
                                  PreTag="div"
                                  wrapLongLines={false}
                                  className="rounded-xl p-4 text-sm overflow-x-auto
                                  scrollbar-thin scrollbar-thumb-mist-500 scrollbar-track-mist-700"
                                >
                                  {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                              </div>
                            ) : (
                              <code
                                className={`${className ?? ""} bg-mist-700 rounded px-1.5 py-0.5 text-sm font-mono`}
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },
                        }}
                      >
                        {part.text}
                      </ReactMarkdown>
                    );
                }
              })}
            </div>
          ))}
        </div>
        <div className="chat__inputArea fixed bottom-4 left-0 right-0 w-full max-w-184 rounded-full bg-mist-700 mx-auto">
          <form
            className="chat__inputForm relative flex items-center gap-2"
            onSubmit={(e) => handleSubmit(e)}
          >
            <input
              id="chat-input"
              className="chat__input border-0 rounded-full h-12 p-2 pr-16 w-full px-4
              text-white focus:outline-none focus:outline-0 focus:border-transparent"
              type="text"
              placeholder="Ask anything :)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              aria-label="Send message"
              className="absolute right-1 w-14 h-10 flex items-center justify-center gap-2
              bg-white text-black rounded-full cursor-pointer hover:bg-gray-200 transition-colors"
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
