"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { SessionProvider } from 'next-auth/react';
import { ToastProvider } from "@/components/ui/toast"
import "../styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastProvider />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
