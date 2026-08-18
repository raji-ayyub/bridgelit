"use client";

import { useRouter } from "next/navigation";
import { Volume2 } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SimpleExplanationPage() {
  const router = useRouter();

  return (
    <>
      <AppHeader title="Simple Explanation" onBack={() => router.back()} />

      <main className="flex flex-1 flex-col px-4 pb-4">
        <Card className="mt-2 p-4">
          <p className="text-sm leading-6 text-slate-700">Here is a simple explanation of this document:</p>
          <div className="mt-3 rounded-2xl bg-emerald-50 px-4 py-4 text-sm leading-7 text-slate-700">
            <p>This is a bank statement.</p>
            <p>You had N10,000 at the start.</p>
            <p>You deposited N5,000 and received N3,000.</p>
            <p>You withdrew N2,000 and paid N4,000 for electricity.</p>
            <p>Your current balance is N12,000.</p>
          </div>
        </Card>

        <Button variant="secondary" className="mt-4">
          <Volume2 className="h-4 w-4" />
          Read Again
        </Button>
      </main>

      <AppShellNav active="home" />
    </>
  );
}
