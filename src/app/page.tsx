"use client";

import { SettingsProvider } from "@/hooks/useSettings";
import { Sidebar } from "@/components/sidebar/Sidebar";
import { PreviewArea } from "@/components/preview/PreviewArea";

export default function Home() {
  return (
    <SettingsProvider>
      <main className="flex h-screen w-screen fixed inset-0 overflow-hidden bg-background">
        <Sidebar />
        <PreviewArea />
      </main>
    </SettingsProvider>
  );
}
