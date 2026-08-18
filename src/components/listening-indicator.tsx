import { Pause, Play, Square, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ListeningIndicatorProps {
  label?: string;
  /** 0-100 */
  progress: number;
  elapsed: string;
  duration: string;
  playing: boolean;
  onToggle: () => void;
  onStop: () => void;
}

/** Big circular indicator + progress bar for "Reading Aloud" / "Listening..." screens. */
export function ListeningIndicator({
  label = "Listening...",
  progress,
  elapsed,
  duration,
  playing,
  onToggle,
  onStop,
}: ListeningIndicatorProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-6">
      <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100">
        <div className={`flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 text-white ${playing ? "animate-pulse" : ""}`}>
          <Volume2 className="h-8 w-8" />
        </div>
      </div>
      <p className="text-base font-semibold text-slate-900">{label}</p>
      <div className="w-full max-w-xs">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
          <div className="h-full rounded-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-1 text-center text-[11px] text-slate-400">
          {elapsed} / {duration}
        </p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" size="sm" onClick={onToggle}>
          {playing ? <Pause className="mr-1.5 h-4 w-4" /> : <Play className="mr-1.5 h-4 w-4" />}
          {playing ? "Pause" : "Play"}
        </Button>
        <Button variant="outline" size="sm" onClick={onStop}>
          <Square className="mr-1.5 h-4 w-4" /> Stop
        </Button>
      </div>
    </div>
  );
}
