import { KeyboardEvent } from "react";
import { Mic, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onMic?: () => void;
  placeholder?: string;
  className?: string;
}

/** "Ask anything..." input bar pinned to the bottom of the AI Tutor screen. */
export function ChatInput({ value, onChange, onSend, onMic, placeholder = "Ask anything...", className }: ChatInputProps) {
  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && value.trim()) onSend();
  }

  return (
    <div className={cn("flex items-center gap-1.5 rounded-full border border-slate-200 bg-white p-1.5 pl-4 shadow-sm", className)}>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
      />
      {onMic && (
        <button
          onClick={onMic}
          aria-label="Voice input"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-slate-400 hover:bg-slate-100"
        >
          <Mic className="h-4 w-4" />
        </button>
      )}
      <Button size="icon" onClick={onSend} disabled={!value.trim()} aria-label="Send message">
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
