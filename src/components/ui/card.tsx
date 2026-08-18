import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/** Neutral white surface used as the base for every list item / panel. */
export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-100 bg-white shadow-sm",
        className
      )}
      {...props}
    />
  );
}
