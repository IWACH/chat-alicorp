import type { Metadata } from "next";
import "./globals.css";

import { siteConfig } from "./config/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head />
      <body
        className={
          "min-h-dvh bg-background text-foreground font-sans antialiased"
        }
      >
        <main className={"flex flex-1 justify-center w-full h-dvh"}>
          {children}
        </main>
      </body>
    </html>
  );
}
