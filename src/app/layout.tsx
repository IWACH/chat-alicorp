import type { Metadata } from "next";
import "./globals.css";

import { siteConfig } from "./config/site";
import { ThemeProvider } from "@/integrations/providers/ThemeProvider";

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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
