import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface QuizOption {
  id: string;
  label: string;
}

interface QuizQuestionProps {
  index: number;
  question: string;
  options: QuizOption[];
  selectedId?: string;
  /** Pass once the user has answered, to reveal correct/incorrect styling. */
  correctId?: string;
  onSelect: (id: string) => void;
}

/** Single quiz question with lettered, selectable options. */
export function QuizQuestion({ index, question, options, selectedId, correctId, onSelect }: QuizQuestionProps) {
  const revealed = correctId !== undefined;

  return (
    <Card className="p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Question {index}</p>
      <p className="mt-1 text-sm font-semibold text-slate-900">{question}</p>
      <div className="mt-4 space-y-2">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          const isCorrect = correctId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition",
                revealed && isCorrect && "border-emerald-500 bg-emerald-50 text-emerald-700",
                revealed && isSelected && !isCorrect && "border-red-400 bg-red-50 text-red-600",
                !revealed && isSelected && "border-indigo-500 bg-indigo-50 text-indigo-700",
                !revealed && !isSelected && "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
              )}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-current text-[11px] font-semibold">
                {opt.id.toUpperCase()}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>
    </Card>
  );
}
