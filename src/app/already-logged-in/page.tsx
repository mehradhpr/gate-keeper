"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/(contexts)/AuthContext";
import { User, LogOut } from "lucide-react";

export default function AlreadyLoggedIn() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    logout();
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-100">
      <Card className="w-full max-w-md p-6 bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl mx-auto">Already Logged In</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <User className="text-white h-16 w-16" />
            <p className="text-sm">You are already logged in.</p>
            <Button
              onClick={handleLogout}
              className="w-full py-2 mt-4 bg-red-600 hover:bg-red-700 rounded-md text-gray-100"
            >
              <LogOut className="mr-2" /> Log Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
