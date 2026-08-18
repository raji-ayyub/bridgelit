import { cn } from "@/lib/utils";

export interface StudyPlanDay {
  day: string;
  topic: string;
  done?: boolean;
}

interface StudyPlanListProps {
  days: StudyPlanDay[];
}

/** "Day 1: Cell Structure" style list shown under Study Planner. */
export function StudyPlanList({ days }: StudyPlanListProps) {
  return (
    <ul className="space-y-2.5">
      {days.map((d, i) => (
        <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
          <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", d.done ? "bg-emerald-500" : "bg-slate-300")} />
          <span>
            <span className="font-medium text-slate-900">{d.day}:</span> {d.topic}
          </span>
        </li>
      ))}
    </ul>
  );
}
