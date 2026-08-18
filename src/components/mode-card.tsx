import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ModeCardProps {
  eyebrow: string;
  title: string;
  description: string;
  icon?: ReactNode;
  tone?: "indigo" | "emerald";
  onClick?: () => void;
}

const toneStyles: Record<NonNullable<ModeCardProps["tone"]>, string> = {
  indigo: "bg-indigo-600",
  emerald: "bg-emerald-600",
};

/** Full-width colored CTA on the welcome screen, e.g. "I am a Student". */
export function ModeCard({ eyebrow, title, description, icon, tone = "indigo", onClick }: ModeCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "relative flex w-full items-center overflow-hidden rounded-2xl p-5 pr-24 text-left text-white shadow-md transition hover:brightness-110 active:brightness-95",
        toneStyles[tone]
      )}
    >
      <div className="relative z-10 max-w-[100%]">
        <p className="text-sm font-medium text-white/80">{eyebrow}</p>
        <p className="mt-0.5 text-xl font-bold">{title}</p>
        <p className="mt-1 text-sm text-white/80">{description}</p>
      </div>
      {icon && (
        <div
          className={cn(
            "absolute right-[-10px] bottom-[-6px] flex h-28 w-28 items-end justify-end overflow-b-hidden opacity-100",
            "pointer-events-none"
          )}
        >
          <div className="h-[auto] w-[116px] [&_img]:h-full [&_img]:w-full [&_img]:object-contain [&_svg]:h-full [&_svg]:w-full">
            {icon}
          </div>
        </div>
      )}
    </button>
  );
}
