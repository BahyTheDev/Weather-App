import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/components/providers/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Meteora - Modern Weather Dashboard",
  description: "Beautiful, real-time weather forecasts with immersive visuals and actionable insights.",
  keywords: ["weather", "forecast", "meteorology", "temperature", "climate"],
  authors: [{ name: "Weather App Team" }],
  openGraph: {
    title: "Meteora - Modern Weather Dashboard",
    description: "Beautiful, real-time weather forecasts with immersive visuals",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-slate-900 dark:to-slate-800`}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
