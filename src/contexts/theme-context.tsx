"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    const isString = typeof args[0] === "string";
    if (
      isString &&
      (args[0].includes("Encountered a script tag while rendering React component") ||
        args[0].includes(
          "A tree hydrated but some attributes of the server rendered HTML didn't match"
        ) ||
        args[0].includes("bis_skin_checked"))
    ) {
      return;
    }
    originalError(...args);
  };
}

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
