"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Volume2 } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { ChatBubble } from "@/components/chat-bubble";
import { ChatInput } from "@/components/chat-input";
import { Card } from "@/components/ui/card";

export default function TutorPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState("Explain photosynthesis in simple terms.");
  const explanation =
    "Photosynthesis is how plants make their own food. They use sunlight, water, and carbon dioxide to make glucose and release oxygen.";

  function handleSpeak() {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(explanation);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  return (
    <>
      <AppHeader title="AI Tutor" onBack={() => router.back()} />

      <main className="flex flex-1 flex-col px-4 pb-4">
        <div className="mt-2 space-y-3">
          <ChatBubble role="user">{prompt}</ChatBubble>

          <Card className="overflow-hidden p-4">
            <p className="text-sm leading-6 text-slate-700">{explanation}</p>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-emerald-900">Simple explanation</p>
                <p className="mt-1 text-xs text-emerald-700">Plants turn sunlight into food.</p>
              </div>
              <Sparkles className="h-5 w-5 text-emerald-600" />
            </div>
            <div className="relative mt-4 flex items-end justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <div className="space-y-2 text-xs text-slate-600">
                <p>Sunlight ☀️</p>
                <p>CO2 →</p>
                <p>Water →</p>
              </div>
              <button
                type="button"
                onClick={handleSpeak}
                aria-label="Read explanation aloud"
                className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-b from-emerald-100 to-emerald-200 text-emerald-600 shadow-sm transition hover:scale-105 active:scale-95"
              >
                <Volume2 className="h-9 w-9" />
              </button>
              <div className="space-y-2 text-xs text-slate-600">
                <p>→ O2</p>
                <p>Glucose (Food)</p>
                <p>Roots 🌱</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="mt-auto pt-4">
          <ChatInput
            value={prompt}
            onChange={setPrompt}
            onSend={() => router.push("/simple-explanation")}
            placeholder="Ask anything..."
            className="w-full"
          />
        </div>
      </main>

      <AppShellNav active="home" />
    </>
  );
}
