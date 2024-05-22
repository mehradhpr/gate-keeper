import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TokenProvider } from "@/app/contexts/token-provider";

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
        <TokenProvider>{children}</TokenProvider>
      </body>
    </html>
  );
}
