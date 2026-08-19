import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DesktopChrome } from "@/components/desktop-chrome";

export const metadata: Metadata = {
  title: "BridgeLit - AI-Powered Learning & Literacy Companion",
  description:
    "Learn better, understand everything - privately and offline. AI tutoring, document reading, and quizzes that work without an internet connection.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#4f46e5",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-100 antialiased" suppressHydrationWarning>
        <DesktopChrome>{children}</DesktopChrome>
      </body>
    </html>
  );
}
