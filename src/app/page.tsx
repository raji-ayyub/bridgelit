"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  LockKeyhole,
  Menu,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WifiOff,
} from "lucide-react";
import { DesktopHome } from "@/components/desktop-home";
import { AppShellNav } from "@/components/app-shell-nav";
import { ModeCard } from "@/components/mode-card";
import { StatusPill } from "@/components/ui/status-pill";

function MobileHome() {
  const router = useRouter();

  return (
    <main className="flex flex-1 flex-col px-5 pb-4 pt-5">
      <header className="flex items-center justify-between">
        <button
          aria-label="Open menu"
          className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
        >
          <Link href={"/"} >
            <Image src={"/images/bridgelit-logo.png"} alt="logo" width={40} height={40} className="w-[1.5rem]"/>
          </Link>
          <Menu className="h-5 w-5" />
        </button>
        <StatusPill online={false} />
      </header>

      <section className="mt-6">
        <h1 className="text-[26px] font-bold leading-tight text-slate-900">
          Welcome to
          <br />
          BridgeLit <span aria-hidden>👋</span>
        </h1>
        <p className="mt-1 text-sm text-slate-500">Your AI learning &amp; literacy companion</p>
      </section>

      <div className="mt-6 space-y-3">
        <ModeCard
          eyebrow="I am a"
          title="Student"
          description="Learn, solve, practice and grow"
          icon={<Image src="/images/boy.png" alt="" width={72} height={72} className="h-14 w-14 object-contain" />}
          tone="indigo"
          onClick={() => router.push("/student")}
        />
        <ModeCard
          eyebrow="I need help"
          title="Reading Documents"
          description="Read and understand documents easily"
          icon={<Image src="/images/geezer.png" alt="" width={72} height={72} className="h-14 w-14 object-contain" />}
          tone="emerald"
          onClick={() => router.push("/reader")}
        />
      </div>

      <div className="mt-4 grid gap-3">
        <div className="flex items-center gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
          <WifiOff className="h-4 w-4 shrink-0 text-emerald-500" />
          <p className="text-xs text-slate-600">
            <span className="font-medium text-slate-900">Everything works offline</span> - no internet needed, your data stays private
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-900">100% Offline</p>
            <p className="mt-1 text-[11px] leading-4 text-slate-500">Your data stays on your device</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-900">Privacy First</p>
            <p className="mt-1 text-[11px] leading-4 text-slate-500">Documents never leave your phone</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
              <Smartphone className="h-5 w-5" />
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-900">For Everyone</p>
            <p className="mt-1 text-[11px] leading-4 text-slate-500">Students, elderly and low-literacy users</p>
          </div>
        </div>

        <Link
          href="/student"
          className="mt-2 inline-flex items-center justify-between rounded-2xl border border-indigo-100 bg-gradient-to-r from-indigo-50 to-violet-50 px-4 py-3 text-sm font-medium text-indigo-700 shadow-sm"
        >
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Explore the full app
          </span>
          <span aria-hidden>→</span>
        </Link>
      </div>

      <div className="mt-auto pt-5">
        <AppShellNav active="home" />
      </div>
    </main>
  );
}

export default function HomePage() {
  return (
    <>
      <div className="flex min-h-dvh flex-col md:hidden">
        <MobileHome />
      </div>
      <div className="hidden md:block">
        <DesktopHome />
      </div>
    </>
  );
}
