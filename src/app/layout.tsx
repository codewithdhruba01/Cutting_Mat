import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono, IBM_Plex_Mono, Roboto_Mono, Inter } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://cuttingmatbggenaretor.vercel.app"),
  title: {
    default: "Cutting Mat Background Generator",
    template: "%s | SVG Cutting Mat Generator",
  },
  description: "A premium design tool to generate highly customizable SVG cutting mat backgrounds. Create pixel-perfect grid mats, adjust colors, and export precision SVGs.",
  keywords: ["svg", "cutting mat", "background generator", "grid generator", "design tool", "vector graphics", "custom mat"],
  authors: [{ name: "codewithdhruba", url: "https://codewithdhruba.in/" }],
  creator: "codewithdhruba",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Professional SVG Cutting Mat Background Generator",
    description: "A premium design tool to generate highly customizable SVG cutting mat backgrounds. Create pixel-perfect grid mats, adjust colors, and export precision SVGs.",
    siteName: "SVG Cutting Mat Generator",
  },
  twitter: {
    card: "summary_large_image",
    title: "Professional SVG Cutting Mat Background Generator",
    description: "A premium design tool to generate highly customizable SVG cutting mat backgrounds.",
    creator: "@codewithdhruba",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${jetBrainsMono.variable} ${ibmPlexMono.variable} ${robotoMono.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased overflow-hidden w-screen h-screen" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
