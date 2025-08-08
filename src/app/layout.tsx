import type { Metadata } from "next";
import "./globals.css";

import { MSWProvider } from "@/integrations/providers/MSWProvider";
import { ThemeProvider } from "@/integrations/providers/ThemeProvider";

import { siteConfig } from "./config/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
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
          <MSWProvider>{children}</MSWProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
