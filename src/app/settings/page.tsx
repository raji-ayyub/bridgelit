"use client";

import { useRouter } from "next/navigation";
import { Bell, Shield } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { Card } from "@/components/ui/card";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <>
      <AppHeader title="Settings" onBack={() => router.back()} />

      <main className="flex flex-1 flex-col px-4 pb-4">
        <div className="mt-2 space-y-3">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Privacy First</p>
                <p className="text-xs text-slate-500">All content stays on your device</p>
              </div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-indigo-600" />
              <div>
                <p className="text-sm font-semibold text-slate-900">Notifications</p>
                <p className="text-xs text-slate-500">Study reminders and quick tips</p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <AppShellNav active="settings" />
    </>
  );
}
