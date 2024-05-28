"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/(contexts)/AuthContext";
import { Lock } from "lucide-react";

export default function AccessDeniedPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated()) {
      router.push("/dashboard"); // Redirect to dashboard if user is logged in
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-100">
      <Card className="w-full max-w-md p-6 bg-gray-800 text-gray-100">
        <CardHeader>
          <CardTitle className="text-2xl mx-auto">Access Denied</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center space-y-4">
            <Lock className="text-white h-16 w-16" />
            <p className="text-sm">You do not have permission to view this page.</p>
            <Button
              onClick={() => router.push('/login')}
              className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-md text-gray-100"
            >
              Go to Login
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
