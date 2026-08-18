"use client";

import { useRouter } from "next/navigation";
import { Bookmark } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { Card } from "@/components/ui/card";

export default function SavedPage() {
  const router = useRouter();

  return (
    <>
      <AppHeader title="Saved" onBack={() => router.back()} />

      <main className="flex flex-1 flex-col px-4 pb-4">
        <Card className="mt-2 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Bookmark className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Saved explanations</p>
              <p className="text-xs text-slate-500">Access your favorite answers offline</p>
            </div>
          </div>
        </Card>
      </main>

      <AppShellNav active="saved" />
    </>
  );
}
