"use client";

import { useRouter } from "next/navigation";
import { Clock3 } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { Card } from "@/components/ui/card";

export default function HistoryPage() {
  const router = useRouter();

  return (
    <>
      <AppHeader title="History" onBack={() => router.back()} />

      <main className="flex flex-1 flex-col px-4 pb-4">
        <div className="mt-2 rounded-2xl bg-white px-4 py-3 text-sm text-slate-500 shadow-sm">Search your past sessions</div>

        <div className="mt-4 space-y-3">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Clock3 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Quadratic Equations</p>
                <p className="text-xs text-slate-500">Today, 9:20 AM</p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <AppShellNav active="history" />
    </>
  );
}
