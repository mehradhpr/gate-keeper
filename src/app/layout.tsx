import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {AppProvider} from "@/app/contexts/context-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AppProvider>
          {children}
      </AppProvider>
      </body>
    </html>
  );
}
