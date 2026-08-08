"use client";

import { SettingsProvider } from "@/hooks/useSettings";
import { Sidebar, SidebarHeader, SidebarContent } from "@/components/sidebar/Sidebar";
import { PreviewArea } from "@/components/preview/PreviewArea";
import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerHeader } from "@/components/ui/drawer";

export default function Home() {
  return (
    <SettingsProvider>
      <main className="flex flex-col lg:flex-row h-[100dvh] w-screen fixed inset-0 overflow-hidden bg-background">
        
        {/* Desktop Sidebar */}
        <Sidebar className="hidden lg:flex" />

        {/* Mobile Header */}
        <div className="lg:hidden p-6 pb-4 z-10 bg-background border-b border-border/10 shrink-0">
          <SidebarHeader />
        </div>

        {/* Main Preview Area */}
        <div className="flex-1 lg:flex-1 relative overflow-hidden min-h-0">
          <PreviewArea />
        </div>

        {/* Mobile Footer */}
        <div className="lg:hidden p-6 bg-background border-t border-border/10 flex flex-col items-center gap-4 z-10 shrink-0">
          <Drawer>
            <DrawerTrigger className="w-full bg-[#1c1c1c] text-white hover:bg-[#2c2c2c] transition-colors h-14 rounded-xl text-md font-medium border border-border/30">
              Customize
            </DrawerTrigger>
            <DrawerContent className="max-h-[85dvh] bg-background">
              <DrawerHeader className="sr-only">
                <DrawerTitle>Customize Mat</DrawerTitle>
              </DrawerHeader>
              <div className="overflow-y-auto p-4 flex flex-col">
                <SidebarContent />
              </div>
            </DrawerContent>
          </Drawer>
          <p className="text-xs text-muted-foreground">
            Made by <a href="https://codewithdhruba.in/" className="underline hover:text-foreground transition-colors">@codewithdhruba</a>
          </p>
        </div>
      </main>
    </SettingsProvider>
  );
}
