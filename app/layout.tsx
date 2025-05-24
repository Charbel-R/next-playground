import { ThemeProvider } from "@/components/theme/theme-provider";
import { ModeToggle } from "@/components/theme/darkmode-toggle";
import { inter } from "@/lib/fonts";
import "./globals.css";
import { Toaster } from "sonner";

export { metadata } from "@/lib/metadata";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="theme"
        >
          {children}
          <div className="absolute end-0 top-0 pe-4 pt-4">
            <ModeToggle />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
