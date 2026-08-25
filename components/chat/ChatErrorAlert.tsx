"use client";

import { AlertCircle, X } from "lucide-react";

interface ChatErrorAlertProps {
  onDismiss: () => void;
}

export const ChatErrorAlert = ({ onDismiss }: ChatErrorAlertProps) => {
  return (
    <div
      role="alert"
      className="flex items-center justify-between gap-3 rounded-xl bg-red-950 px-4 py-3 text-sm text-red-100"
    >
      <div className="flex items-center gap-2">
        <AlertCircle size={18} aria-hidden="true" />
        <span>We couldn&apos;t complete that response. Please try again.</span>
      </div>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss error"
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-red-100 hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-red-200"
      >
        <X size={16} aria-hidden="true" />
      </button>
    </div>
  );
};
