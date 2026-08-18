"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookmarkPlus, Share2 } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { QuizQuestion } from "@/components/quiz-question";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function QuizGeneratorPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string | undefined>("b");

  return (
    <>
      <AppHeader title="Quiz Generator" onBack={() => router.back()} />

      <main className="flex flex-1 flex-col px-4 pb-4">
        <Card className="mt-2 p-4">
          <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-800">
            Generate 5 quiz questions on Nigerian History.
          </div>

          <div className="mt-4">
            <QuizQuestion
              index={1}
              question="Who was the first President of Nigeria?"
              options={[
                { id: "a", label: "Nnamdi Azikiwe" },
                { id: "b", label: "Tafawa Balewa" },
                { id: "c", label: "Shehu Shagari" },
                { id: "d", label: "Olusegun Obasanjo" },
              ]}
              selectedId={selected}
              onSelect={setSelected}
            />
          </div>

          <Button className="mt-4 w-full">Next Question</Button>

          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <button className="inline-flex items-center gap-1.5">
              <BookmarkPlus className="h-4 w-4" />
              Save Quiz
            </button>
            <button className="inline-flex items-center gap-1.5">
              <Share2 className="h-4 w-4" />
              Share
            </button>
          </div>
        </Card>
      </main>

      <AppShellNav active="home" />
    </>
  );
}
