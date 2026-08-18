"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  Camera,
  Clock3,
  FileText,
  Home as HomeIcon,
  MessageCircleMore,
  Settings,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  { key: "home", label: "Home", href: "/", icon: HomeIcon },
  { key: "tutor", label: "Ask Tutor", href: "/tutor", icon: MessageCircleMore },
  { key: "photo-solver", label: "Photo Solver", href: "/photo-solver", icon: Camera },
  { key: "reader", label: "Read Document", href: "/reader", icon: FileText },
  { key: "history", label: "History", href: "/history", icon: Clock3 },
];

export function DesktopChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") {
    return children;
  }

  return (
    <>
      <div className="hidden min-h-dvh w-full bg-white md:flex">
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
              const Icon = item.icon;
              const isActive = item.href === "/"
                ? pathname === "/"
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

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
              className={cn(
                "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left text-[15px] transition",
                pathname === "/settings" ? "bg-violet-50 text-violet-700" : "text-slate-700 hover:bg-slate-50"
              )}
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

        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      </div>

      <div className="flex min-h-dvh w-full flex-col md:hidden">{children}</div>
    </>
  );
}
