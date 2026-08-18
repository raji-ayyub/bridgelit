"use client";

import { useRouter } from "next/navigation";
import { FileText, Sparkles } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { StudyPlanList } from "@/components/study-plan-list";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function StudyPlannerPage() {
  const router = useRouter();

  return (
    <>
      <AppHeader title="Study Planner" onBack={() => router.back()} />

      <main className="flex flex-1 flex-col px-4 pb-4">
        <Card className="mt-2 p-4">
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-slate-800">Upload your notes or topic</div>

          <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-900">Biology_Notes.pdf</p>
                <p className="text-xs text-slate-500">24 pages</p>
              </div>
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-emerald-50/80 p-4">
            <p className="text-sm font-semibold text-emerald-900">Your Study Plan</p>
            <div className="mt-3">
              <StudyPlanList
                days={[
                  { day: "Day 1", topic: "Cell Structure" },
                  { day: "Day 2", topic: "Cell Functions" },
                  { day: "Day 3", topic: "Plant Cells" },
                  { day: "Day 4", topic: "Animal Cells" },
                  { day: "Day 5", topic: "Review & Quiz" },
                ]}
              />
            </div>
          </div>

          <Button className="mt-4 w-full">Start Plan</Button>
        </Card>
      </main>

      <AppShellNav active="home" />
    </>
  );
}
