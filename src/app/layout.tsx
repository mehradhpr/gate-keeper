// app/layout.tsx
import NavBar from "@/app/(components)/NavBar";
import { ReactNode } from "react";
import { TokenProvider } from "@/app/(contexts)/token-provider";
import "@/app/globals.css";
import { AuthProvider } from "@/app/(contexts)/AuthContext";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <html lang="en">
        <body className={"bg-gray-900"}>
          <AuthProvider>
            <TokenProvider>
              <main className={`${inter.className} `}>
                <NavBar />
                {children}
              </main>
            </TokenProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
