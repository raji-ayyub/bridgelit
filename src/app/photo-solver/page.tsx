"use client";

import { useRouter } from "next/navigation";
import { Bookmark, ScanLine } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function PhotoSolverPage() {
  const router = useRouter();

  return (
    <>
      <AppHeader title="Photo Solver" onBack={() => router.back()} />

      <main className="flex flex-1 flex-col px-4 pb-4">
        <Card className="mt-2 p-4">
          <div className="rounded-2xl bg-emerald-100 px-4 py-3 text-center text-sm text-slate-800">Solve for x: 2x + 3 = 11</div>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-[linear-gradient(180deg,#f7f3ea,#f4efe7)] p-4 shadow-inner">
            <div className="rounded-xl border-2 border-dashed border-indigo-400/80 p-5">
              <div className="rounded-2xl bg-white/70 p-6 text-center">
                <p className="text-xl text-slate-800">Solve for x:</p>
                <p className="mt-4 text-3xl font-light tracking-tight text-slate-900">2x + 3 = 11</p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Step-by-step Solution</p>
            <ol className="mt-3 space-y-1.5 text-sm leading-6 text-slate-600">
              <li>1. 2x + 3 = 11</li>
              <li>2. 2x = 11 - 3</li>
              <li>3. 2x = 8</li>
              <li>4. x = 4</li>
            </ol>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Button variant="outline" className="flex-1">
              <ScanLine className="h-4 w-4" />
              Explain more
            </Button>
            <Button variant="outline" className="flex-1">
              <Bookmark className="h-4 w-4" />
              Save
            </Button>
          </div>
        </Card>
      </main>

      <AppShellNav active="home" />
    </>
  );
}
