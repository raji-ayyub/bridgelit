import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChatBubbleProps {
  role: "user" | "assistant";
  children: ReactNode;
}

/** Single message bubble — right-aligned indigo for the user, left-aligned gray for the assistant. */
export function ChatBubble({ role, children }: ChatBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          isUser ? "rounded-br-sm bg-indigo-600 text-white" : "rounded-bl-sm bg-slate-100 text-slate-700"
        )}
      >
        {children}
      </div>
    </div>
  );
}
