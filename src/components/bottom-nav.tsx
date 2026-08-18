import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BottomNavItem {
  key: string;
  label: string;
  icon: ReactNode;
}

interface BottomNavProps {
  items: BottomNavItem[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}

/** Home / History / Saved / Settings tab bar, pinned to the bottom of the screen. */
export function BottomNav({ items, active, onChange, className }: BottomNavProps) {
  return (
    <nav className={cn("flex items-center justify-around border-t border-slate-100 bg-white px-2 py-2 md:hidden", className)}>
      {items.map((item) => {
        const isActive = item.key === active;
        return (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-colors [&_svg]:h-5 [&_svg]:w-5",
              isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-500"
            )}
          >
            {item.icon}
            {item.label}
          </button>
        );
      })}
    </nav>
  );
}
