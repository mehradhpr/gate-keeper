"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/(contexts)/AuthContext";

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { getClientUserInfo } = useAuth();
  const { logout } = useAuth();
  const [firstName, setFirstName] = useState("Guest");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      setIsLoggedIn(true);
      setFirstName(getClientUserInfo().firstName);
    } else {
      setIsLoggedIn(false);
    }
  }, [isAuthenticated, getClientUserInfo]);

  const handleLogout = () => {
    // Implement logout logic
    router.push("/login");
    logout();
  };

  const buttonClass = "bg-blue-600 hover:bg-blue-700 text-white rounded-md";

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 shadow-md rounded-3xl mt-5 mx-5">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <p className="text-2xl font-extrabold tracking-widest text-black drop-shadow-lg">
            GateKeeper
          </p>
        </Link>
        <div className="flex items-center">
          {isLoggedIn ? (
            <>
              <span className="text-white mr-4">Hello, {firstName}</span>
              <Link href="/dashboard">
                <Button
                  className={`mr-2 ${buttonClass} ${pathname === "/dashboard" ? "bg-blue-900" : ""}`}
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/administration">
                <Button
                  className={`mr-2 bg-blue-600 hover:bg-amber-500 text-white rounded-md ${pathname === "/administration" ? "bg-amber-600" : ""}`}
                >
                  Administration
                </Button>
              </Link>
              <Link href="/account">
                <Button
                  className={`mr-2 ${buttonClass} ${pathname === "/account" ? "bg-blue-900" : ""}`}
                >
                  Account
                </Button>
              </Link>
              <Link href="/">
                <Button
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-red-600 text-white rounded-md"
                >
                  Log Out
                </Button>
              </Link>

              <Unlock className="ml-4 text-black" />
            </>
          ) : (
            <>
              <Link href="/register">
                <Button
                  className={`mr-2 ${buttonClass} ${
                    pathname === "/register" ? "bg-blue-900" : ""
                  }`}
                >
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  className={`${buttonClass} ${
                    pathname === "/login" ? "bg-blue-900" : ""
                  }`}
                >
                  Log In
                </Button>
              </Link>
              <Lock className="ml-4 text-black" />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
