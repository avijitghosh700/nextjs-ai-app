"use client";

import { Send } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  hasMessages: boolean;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
}

export const ChatInput = ({ input, setInput, hasMessages, onSubmit }: ChatInputProps) => {
  return (
    <div
      className={`chat__inputContainer fixed inset-x-0 mx-auto max-w-3xl px-4 md:px-0
      flex flex-col justify-center gap-4 ${hasMessages ? "bottom-4" : "top-0 bottom-0"}`}
    >
      {!hasMessages && (
        <h1 className="text-center text-2xl text-gray-400">Hello! How can I assist you today?</h1>
      )}
      <div className="chat__inputArea w-full  rounded-full bg-mist-700 shadow-lg ">
        <form className="chat__inputForm relative flex items-center gap-2" onSubmit={onSubmit}>
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
  );
};
