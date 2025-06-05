import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

import { ModeToggle } from "@/components/theme/darkmode-toggle";
import { ThemeProvider } from "@/components/theme/theme-provider";

import { inter } from "@/lib/fonts";

import Navbar from "./_components/navbar";
import "./globals.css";

export { metadata } from "@/lib/metadata";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
          >
            <Navbar />
            <main className="pt-16">{children}</main>
            <Toaster
              position="top-right"
              richColors
              closeButton
              toastOptions={{
                style: {
                  background: "hsl(var(--card))",
                  color: "hsl(var(--card-foreground))",
                  border: "1px solid hsl(var(--border))",
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
