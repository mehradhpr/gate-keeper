// app/layout.tsx
import NavBar from "@/app/(components)/NavBar";
import { ReactNode } from "react";
import "@/app/globals.css";
import { AuthProvider } from "@/app/(contexts)/AuthContext";
import { Inter } from "next/font/google";
import {LoadingProvider} from "@/app/(contexts)/LoadingContext";
import {Loading} from "@/app/(components)/Loading";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <html lang="en">
        <body className={"bg-gray-900"}>
          <AuthProvider>
            <LoadingProvider>
              <main className={`${inter.className} `}>
                <Loading></Loading>
                <NavBar/>
                {children}
              </main>
            </LoadingProvider>
          </AuthProvider>
        </body>
      </html>
    </>
  );
};

export default RootLayout;
