"use client";

import { useWorkspaceStore } from "@/store/workspace-store";
import { Tabs, TabsList, TabsTrigger } from "./tabs";

export function AppModeToggle() {
  const { appMode, setAppMode } = useWorkspaceStore();

  return (
    <Tabs
      value={appMode}
      onValueChange={(val) => setAppMode(val as "cutting-mat" | "template")}
      className="w-full mb-4"
    >
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="cutting-mat">Cutting mat</TabsTrigger>
        <TabsTrigger value="template">Template</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
