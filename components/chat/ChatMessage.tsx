"use client";

import { Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { UIMessage } from "ai";

const handleCopyCode = (e: React.MouseEvent<HTMLButtonElement>, code: string) => {
  navigator.clipboard.writeText(code.replace(/\n$/, ""));
  const btn = e.currentTarget;
  const original = btn.innerHTML;
  btn.innerHTML = "Copied";
  setTimeout(() => {
    btn.innerHTML = original;
  }, 1500);
};

export const ChatMessage = ({ message }: { message: UIMessage }) => {
  return (
    <div
      className={`chat__message max-w-[75%] rounded-3xl py-3 leading-relaxed ${
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
  );
};
