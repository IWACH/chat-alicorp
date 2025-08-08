import "@/core/styles/globals.css";

import { siteConfig } from "@/app/config/site.config";
import { MSWProvider } from "@/integrations/providers/MSWProvider";
import { ReactQueryProvider } from "@/integrations/providers/ReactQueryProvider";
import { ThemeProvider } from "@/integrations/providers/ThemeProvider";

export const metadata = siteConfig.metadata;

export const viewport = siteConfig.viewport;

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
