import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type IconTileColor = "indigo" | "emerald" | "amber" | "sky";

const colorStyles: Record<IconTileColor, string> = {
  indigo: "bg-indigo-600 text-white",
  emerald: "bg-emerald-600 text-white",
  amber: "bg-amber-500 text-white",
  sky: "bg-sky-500 text-white",
};

interface IconTileProps {
  icon: ReactNode;
  color?: IconTileColor;
  size?: "sm" | "md";
  className?: string;
}

/** Small rounded-square icon swatch, e.g. the AI Tutor / Photo Solver icons. */
export function IconTile({ icon, color = "indigo", size = "md", className }: IconTileProps) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl",
        colorStyles[color],
        size === "sm" ? "h-9 w-9 [&_svg]:h-4 [&_svg]:w-4" : "h-11 w-11 [&_svg]:h-5 [&_svg]:w-5",
        className
      )}
    >
      {icon}
    </div>
  );
}
