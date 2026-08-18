"use client";

import { useRouter } from "next/navigation";
import { Bookmark, History, Home as HomeIcon, Settings } from "lucide-react";
import { BottomNav, BottomNavItem } from "@/components/bottom-nav";

const items: BottomNavItem[] = [
  { key: "home", label: "Home", icon: <HomeIcon /> },
  { key: "history", label: "History", icon: <History /> },
  { key: "saved", label: "Saved", icon: <Bookmark /> },
  { key: "settings", label: "Settings", icon: <Settings /> },
];

export function AppShellNav({ active }: { active: string }) {
  const router = useRouter();

  return <BottomNav items={items} active={active} onChange={(key) => router.push(key === "home" ? "/" : `/${key}`)} />;
}
