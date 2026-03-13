import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AuthProvider } from "@/components/providers/AuthProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Hapkonic — Premium Social Media & Analytics Platform",
  description: "High-end social media intelligence, analytics, and strategy dashboard.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(outfit.className, spaceMono.variable, "bg-background text-foreground antialiased selection:bg-accent-cyan/30 noise min-h-screen")}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
