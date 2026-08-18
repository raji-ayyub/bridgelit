import { ReactNode } from "react";
import { ChevronLeft, Menu } from "lucide-react";

import Image from "next/image";
import logo from "images/bridgelit-logo.png"

interface AppHeaderProps {
  title: string;
  onBack?: () => void;
  onMenu?: () => void;
  right?: ReactNode;
}

/** Top bar: back chevron or hamburger on the left, title, optional right slot. */
export function AppHeader({ title, onBack, onMenu, right }: AppHeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3">
            <Image src={"images/bridgelit-logo.png"} alt="logo" width={200} height={200}/>

      <div className="flex items-center gap-3">
        {onBack && (
          <button
            onClick={onBack}
            aria-label="Go back"
            className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        {onMenu && !onBack && (
          <div className="flex gap-2">
            <button
              onClick={onMenu}
              aria-label="Open menu"
              className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        )}
        <h1 className="text-base font-semibold text-slate-900">{title}</h1>
      </div>
      {right}
    </header>
  );
}
