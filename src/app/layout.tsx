import type { Metadata, Viewport } from "next";
import "./globals.css";

import { MSWProvider } from "@/integrations/providers/MSWProvider";
import { ReactQueryProvider } from "@/integrations/providers/ReactQueryProvider";
import { ThemeProvider } from "@/integrations/providers/ThemeProvider";

import { siteConfig } from "./config/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head />
      <body
        className={
          "min-h-dvh bg-background text-foreground font-sans antialiased"
        }
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MSWProvider>
            <ReactQueryProvider>{children}</ReactQueryProvider>
          </MSWProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
