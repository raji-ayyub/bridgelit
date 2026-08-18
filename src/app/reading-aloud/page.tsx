"use client";

import { useRouter } from "next/navigation";
import { Pause, Square, Volume2 } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { Button } from "@/components/ui/button";

export default function ReadingAloudPage() {
  const router = useRouter();

  return (
    <>
      <AppHeader title="Reading Aloud" onBack={() => router.back()} />

      <main className="flex flex-1 flex-col px-4 pb-4">
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex h-36 w-36 items-center justify-center rounded-full bg-emerald-100">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/25">
              <Volume2 className="h-10 w-10" />
            </div>
          </div>
          <p className="text-lg font-semibold text-slate-900">Listening...</p>

          <div className="w-full max-w-[260px]">
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full w-[28%] rounded-full bg-emerald-500" />
            </div>
            <p className="mt-2 text-center text-[11px] text-slate-400">00:15 / 01:25</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button variant="outline">
            <Pause className="h-4 w-4" />
            Pause
          </Button>
          <Button variant="outline">
            <Square className="h-4 w-4" />
            Stop
          </Button>
        </div>

        <p className="mt-6 text-center text-sm leading-6 text-slate-600">The document is being read aloud for you.</p>
      </main>

      <AppShellNav active="home" />
    </>
  );
}
