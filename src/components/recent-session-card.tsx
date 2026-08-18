import { ChevronRight } from "lucide-react";

interface RecentSessionCardProps {
  title: string;
  subtitle: string;
  timestamp: string;
  onClick?: () => void;
}

/** Row shown under "Recent Sessions" — e.g. "Quadratic Equations". */
export function RecentSessionCard({ title, subtitle, timestamp, onClick }: RecentSessionCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:shadow-md"
    >
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{subtitle}</p>
        <p className="mt-1 text-[11px] text-slate-400">{timestamp}</p>
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-slate-300" />
    </button>
  );
}
