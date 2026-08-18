"use client";

import { useRouter } from "next/navigation";
import { Play, RotateCcw } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ReadingDocumentPage() {
  const router = useRouter();

  return (
    <>
      <AppHeader title="Reading Document" onBack={() => router.back()} />

      <main className="flex flex-1 flex-col px-4 pb-4">
        <Card className="mt-2 p-3">
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-[#f4eee3] p-4 shadow-inner">
            <div className="mx-auto max-w-[240px] rounded-md bg-white p-4 text-[10px] leading-4 text-slate-700 shadow-md">
              <p className="mb-2 text-center text-[11px] font-semibold text-slate-900">ZENITH BANK</p>
              <div className="space-y-1">
                <p>Account Number: 1234567890</p>
                <p>Account Name: John Doe</p>
                <div className="mt-3 grid grid-cols-[1fr_auto_auto] gap-1 text-[9px] text-slate-500">
                  <span>Date</span>
                  <span>Description</span>
                  <span>Amount</span>
                </div>
                <div className="space-y-1 pt-2 text-[9px]">
                  <div className="grid grid-cols-[1fr_auto_auto] gap-1"><span>01/05/24</span><span>Balance B/F</span><span>10,000.00</span></div>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-1"><span>05/05/24</span><span>Cash Deposit</span><span>+5,000.00</span></div>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-1"><span>10/05/24</span><span>ATM Withdrawal</span><span>-2,000.00</span></div>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-1"><span>15/05/24</span><span>Transfer Received</span><span>+3,000.00</span></div>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-1"><span>20/05/24</span><span>Electricity Bill</span><span>-4,000.00</span></div>
                  <div className="grid grid-cols-[1fr_auto_auto] gap-1"><span>25/05/24</span><span>Balance C/F</span><span>12,000.00</span></div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline">
            <RotateCcw className="h-4 w-4" />
            Retake
          </Button>
          <Button variant="secondary">
            <Play className="h-4 w-4" />
            Read Aloud
          </Button>
        </div>
      </main>

      <AppShellNav active="home" />
    </>
  );
}
