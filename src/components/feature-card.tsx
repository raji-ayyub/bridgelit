import { ReactNode } from "react";
import { IconTile, IconTileColor } from "@/components/ui/icon-tile";

interface FeatureCardProps {
  icon: ReactNode;
  color?: IconTileColor;
  title: string;
  description: string;
  onClick?: () => void;
}

/**
 * 2-column grid tile used on the Student Mode screen
 * (AI Tutor / Photo Solver / Quiz Generator / Study Planner).
 */
export function FeatureCard({ icon, color, title, description, onClick }: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-start gap-3 rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
    >
      <IconTile icon={icon} color={color} />
      <div>
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-slate-500">{description}</p>
      </div>
    </button>
  );
}
