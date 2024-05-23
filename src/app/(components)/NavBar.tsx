"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Lock, Unlock } from "lucide-react";
import { useRouter } from "next/navigation";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Set to false initially
  const [firstName, setFirstName] = useState(""); // State to hold the first name
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Mock fetching the user's first name
    if (isLoggedIn) {
      setFirstName("John"); // Replace with real fetching logic
    }
  }, [isLoggedIn]);

  const handleLogout = () => {
    // Implement logout logic
    router.push("/login");
    setIsLoggedIn(false);
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
                  className={`mr-2 ${buttonClass} ${pathname === "/dashboard" ? "bg-blue-800" : ""}`}
                >
                  Dashboard
                </Button>
              </Link>
              <Link href="/account-settings">
                <Button
                  className={`mr-2 ${buttonClass} ${pathname === "/account-settings" ? "bg-blue-800" : ""}`}
                >
                  Account Settings
                </Button>
              </Link>
              <Button
                onClick={handleLogout}
                className="bg-blue-600 hover:bg-red-600 text-white rounded-md"
              >
                Log Out
              </Button>
              <Unlock className="ml-4 text-black" />
            </>
          ) : (
            <>
              <Link href="/register">
                <Button
                  className={`mr-2 ${buttonClass} ${
                    pathname === "/register" ? "bg-blue-800" : ""
                  }`}
                >
                  Register
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  className={`${buttonClass} ${
                    pathname === "/login" ? "bg-blue-800" : ""
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
