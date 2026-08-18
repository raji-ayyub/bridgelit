"use client";

import type { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Bot, Camera, CalendarRange, PenLine, UserCircle2 } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { IconTile } from "@/components/ui/icon-tile";
import { RecentSessionCard } from "@/components/recent-session-card";
import { StatusPill } from "@/components/ui/status-pill";

function FeatureGridItem({
  title,
  description,
  icon,
  color,
  onClick,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  color: "indigo" | "emerald" | "amber" | "sky";
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className="flex min-h-[140px] flex-col items-start rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm">
      <IconTile icon={icon} color={color} />
      <p className="mt-4 text-[15px] font-semibold text-slate-900">{title}</p>
      <p className="mt-1.5 text-sm leading-5 text-slate-600">{description}</p>
    </button>
  );
}

export default function StudentPage() {
  const router = useRouter();

  return (
    <>
      <AppHeader
        title="Student Mode"
        onMenu={() => undefined}
        right={
          <div className="flex items-center gap-3">
            <StatusPill online={false} />
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-violet-700">
              <UserCircle2 className="h-6 w-6" />
            </div>
          </div>
        }
      />

      <main className="flex-1 overflow-y-auto px-4 pb-4">
        <p className="px-1 text-sm text-slate-500">How can I help you learn today?</p>

        <section className="mt-5 grid grid-cols-2 gap-3">
          <FeatureGridItem
            title="AI Tutor"
            description="Ask any question and get clear explanations"
            icon={<Bot />}
            color="indigo"
            onClick={() => router.push("/tutor")}
          />
          <FeatureGridItem
            title="Photo Solver"
            description="Take a photo of a problem and get step-by-step solution"
            icon={<Camera />}
            color="emerald"
            onClick={() => router.push("/photo-solver")}
          />
          <FeatureGridItem
            title="Quiz Generator"
            description="Generate quizzes to test your knowledge"
            icon={<PenLine />}
            color="amber"
            onClick={() => router.push("/quiz-generator")}
          />
          <FeatureGridItem
            title="Study Planner"
            description="Upload notes or topic and get a study plan"
            icon={<CalendarRange />}
            color="sky"
            onClick={() => router.push("/study-planner")}
          />
        </section>

        <section className="mt-6">
          <div className="mb-3 flex items-center justify-between px-1">
            <h2 className="text-base font-semibold text-slate-900">Recent Sessions</h2>
            <button className="text-sm font-medium text-indigo-600">View all</button>
          </div>
          <RecentSessionCard
            title="Quadratic Equations"
            subtitle="Explained clearly"
            timestamp="Today, 9:20 AM"
            onClick={() => router.push("/tutor")}
          />
        </section>
      </main>

      <AppShellNav active="home" />
    </>
  );
}
