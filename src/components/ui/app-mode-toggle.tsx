"use client";

import { Tabs, TabsList, TabsTrigger } from "./tabs";

export function AppModeToggle() {
  return (
    <Tabs defaultValue="cutting-mat" className="w-full mb-4">
      <TabsList className="w-full grid grid-cols-2">
        <TabsTrigger value="cutting-mat">Cutting mat</TabsTrigger>
        <TabsTrigger value="template">Template</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
