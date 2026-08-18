"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Camera,
  ChevronDown,
  ChevronRight,
  Clock3,
  FileText,
  Home as HomeIcon,
  MessageCircleMore,
  Settings,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { key: "home", label: "Home", href: "/", icon: HomeIcon },
  { key: "tutor", label: "Ask Tutor", href: "/tutor", icon: MessageCircleMore },
  { key: "photo", label: "Photo Solver", href: "/photo-solver", icon: Camera },
  { key: "reader", label: "Help me read", href: "/reader", icon: FileText },
  { key: "history", label: "History", href: "/history", icon: Clock3 },
];

function HeroCard({
  tone,
  icon,
  title,
  description,
  cta,
  href,
}: {
  tone: "violet" | "emerald";
  icon: ReactNode;
  title: string;
  description: string;
  cta: string;
  href: string;
}) {
  const toneStyles =
    tone === "violet"
      ? "border-violet-200 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.10),_rgba(250,247,255,0.96)_55%,_#ffffff)]"
      : "border-emerald-200 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.10),_rgba(244,253,247,0.96)_55%,_#ffffff)]";
  const buttonStyles =
    tone === "violet" ? "bg-gradient-to-r from-violet-600 to-indigo-600" : "bg-gradient-to-r from-emerald-600 to-green-600";

  return (
    <section className={cn("rounded-[24px] border p-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]", toneStyles)}>
      <div
        className={cn(
          "mx-auto flex h-24 w-24 items-center justify-center overflow-hidden rounded-full",
          tone === "violet" ? "bg-violet-600" : "bg-emerald-600"
        )}
      >
        {icon}
      </div>
      <div className="mt-5 text-center">
        <h2 className="text-[32px] font-semibold tracking-tight text-slate-950">{title}</h2>
        <p className="mx-auto mt-3 max-w-[320px] text-[16px] leading-7 text-slate-600">{description}</p>
      </div>
      <Link
        href={href}
        className={cn(
          "mt-6 inline-flex h-12 w-full items-center justify-center gap-3 rounded-full text-[16px] font-semibold text-white shadow-lg shadow-slate-950/10 transition hover:brightness-105",
          buttonStyles
        )}
      >
        {cta}
        <ChevronRight className="h-5 w-5" />
      </Link>
    </section>
  );
}

function ContinueItem({
  tone,
  icon,
  title,
  subtitle,
}: {
  tone: "violet" | "emerald";
  icon: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button className="flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left transition hover:bg-slate-50">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl",
            tone === "violet" ? "bg-violet-100 text-violet-700" : "bg-emerald-100 text-emerald-700"
          )}
        >
          {icon}
        </div>
        <div>
          <p className="text-[15px] font-medium text-slate-900">{title}</p>
          <p className="mt-1.5 text-[13px] text-slate-500">{subtitle}</p>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-slate-400" />
    </button>
  );
}

export function DesktopHome() {
  const router = useRouter();

  return (
    <div className="flex min-h-dvh w-full bg-white">
      <aside className="flex w-[230px] shrink-0 flex-col border-r border-slate-100 bg-white px-5 py-5">
        <div className="flex flex-col items-center text-center">
          <div className="relative h-20 w-20 overflow-hidden rounded-[22px] shadow-lg shadow-violet-500/20">
            <Image
              src="/images/bridgelit-logo.png"
              alt="BridgeLit logo"
              fill
              sizes="80px"
              className="object-cover"
              priority
            />
          </div>
          <h1 className="mt-4 text-[24px] font-semibold tracking-tight text-slate-950">BridgeLit</h1>
          <p className="mt-2 max-w-[168px] text-[13px] leading-5 text-slate-600">AI-Powered Learning &amp; Literacy Companion</p>
        </div>

        <nav className="mt-10 space-y-1.5">
          {sidebarItems.map((item) => {
            const isActive = item.key === "home";
            const Icon = item.icon;

            return (
              <button
                key={item.key}
                onClick={() => router.push(item.href)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] transition",
                  isActive ? "bg-violet-50 text-violet-700 shadow-[inset_0_0_0_1px_rgba(139,92,246,0.12)]" : "text-slate-700 hover:bg-slate-50"
                )}
              >
                <Icon className="h-5.5 w-5.5 shrink-0" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-auto space-y-3">
          <button
            onClick={() => router.push("/settings")}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] text-slate-700 transition hover:bg-slate-50"
          >
            <Settings className="h-5.5 w-5.5 shrink-0" />
            <span>Settings</span>
          </button>

          <div className="rounded-2xl bg-emerald-50 px-4 py-4 shadow-[0_10px_24px_rgba(16,185,129,0.08)]">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-7 w-7 shrink-0 text-emerald-600" />
              <div>
                <p className="text-[14px] font-medium text-slate-900">Your privacy matters</p>
                <p className="mt-1 text-[13px] leading-5 text-slate-600">All data stays on your device.</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[82px] items-center justify-end border-b border-slate-100 bg-white px-8">
          <div className="flex items-center gap-5">
            <div className="inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-white px-4 py-2 text-[14px] font-medium text-slate-900 shadow-sm">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
              Offline Mode
            </div>
            <div className="h-8 w-px bg-slate-200" />
            <button className="flex items-center gap-4">
              <div className="relative h-11 w-11 overflow-hidden rounded-full shadow-lg shadow-violet-500/20">
                <Image src="/images/boy.png" alt="User avatar" fill sizes="44px" className="object-cover" />
              </div>
              <span className="text-[16px] font-semibold text-slate-950">Alex</span>
              <ChevronDown className="h-4.5 w-4.5 text-slate-500" />
            </button>
          </div>
        </header>

        <main className="min-w-0 flex-1 overflow-y-auto px-8 py-8">
          <div className="max-w-[1080px]">
            <h2 className="text-[48px] font-semibold tracking-tight text-[#13174c]">Welcome to BridgeLit</h2>
            <p className="mt-4 text-[22px] font-light text-[#49507f]">What would you like to do today?</p>

            <section className="mt-8 grid gap-5 xl:grid-cols-2">
              <HeroCard
                tone="violet"
                icon={<Image src="/images/boy.png" alt="Learning avatar" width={110} height={110} className="h-[92px] w-[92px] object-contain" />}
                title="I want to learn"
                description="Ask questions, solve problems, and improve your understanding."
                cta="Start Learning"
                href="/student"
              />
              <HeroCard
                tone="emerald"
                icon={<Image src="/images/geezer.png" alt="Reading avatar" width={110} height={110} className="h-[92px] w-[92px] object-contain" />}
                title="I need help reading"
                description="For elders and anyone who wants a document read or explained."
                cta="Read Now"
                href="/reader"
              />
            </section>

            <section className="mt-7 rounded-[24px] border border-slate-100 bg-white p-6 shadow-[0_10px_24px_rgba(15,23,42,0.05)]">
              <h3 className="text-[17px] font-semibold text-slate-950">Continue where you left off</h3>
              <div className="mt-3 grid gap-1.5 xl:grid-cols-2 xl:gap-3">
                <ContinueItem
                  tone="violet"
                  icon={<Image src="/images/boy.png" alt="" width={56} height={56} className="h-9 w-9 object-contain" />}
                  title="Mathematics - Quadratic Equations"
                  subtitle="Last opened - 2 hours ago"
                />
                <ContinueItem
                  tone="emerald"
                  icon={<Image src="/images/geezer.png" alt="" width={56} height={56} className="h-9 w-9 object-contain" />}
                  title="Bank Statement - Read &amp; Explain"
                  subtitle="Last opened - Yesterday"
                />
              </div>
            </section>

            <div className="mt-7 flex justify-center">
              <div className="inline-flex items-center gap-5 rounded-full bg-slate-50 px-6 py-3 text-[14px] text-[#4d5684] shadow-[0_10px_24px_rgba(15,23,42,0.04)]">
                <span className="inline-flex items-center gap-3">
                  <ShieldCheck className="h-4.5 w-4.5 text-[#47507c]" />
                  Works offline
                </span>
                <span className="text-slate-300">•</span>
                <span className="inline-flex items-center gap-3">
                  <Sparkles className="h-4.5 w-4.5 text-[#47507c]" />
                  Your information stays on your device
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
