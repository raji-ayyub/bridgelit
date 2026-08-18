import { cn } from "@/lib/utils";

interface StatusPillProps {
  online?: boolean;
  className?: string;
}

/** "Offline" / "Online" pill shown in the top-right of the home screen. */
export function StatusPill({ online = false, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium",
        online ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-500",
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          online ? "bg-emerald-500" : "bg-slate-400"
        )}
      />
      {online ? "Online" : "Offline"}
    </span>
  );
}
