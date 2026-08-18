"use client";

import { useRouter } from "next/navigation";
import { Camera, GalleryHorizontalEnd, Lightbulb } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { AppShellNav } from "@/components/app-shell-nav";
import { UploadCard } from "@/components/upload-card";
import { Button } from "@/components/ui/button";

export default function ReaderPage() {
  const router = useRouter();

  return (
    <>
      <AppHeader title="Document Reader" onBack={() => router.back()} />

      <main className="flex flex-1 flex-col px-4 pb-4">
        <div className="mt-2 rounded-2xl bg-emerald-50 px-4 py-3 text-center text-sm text-slate-800">
          Take a clear photo of any document
        </div>

        <div className="mt-4">
          <UploadCard label="Document capture area" hint="Position the page inside the frame" />
        </div>

        <div className="mt-4 flex items-center justify-center">
          <Button variant="secondary" size="icon" className="h-14 w-14">
            <Camera className="h-5 w-5" />
          </Button>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
          <button className="inline-flex items-center gap-1.5">
            <GalleryHorizontalEnd className="h-4 w-4" />
            Gallery
          </button>
          <button className="inline-flex items-center gap-1.5">
            <Lightbulb className="h-4 w-4" />
            Tips
          </button>
        </div>
      </main>

      <AppShellNav active="home" />
    </>
  );
}
