// app/dashboard/page.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import UserDashboard from "@/app/(components)/UserDashboard";
import AdminDashboard from "@/app/(components)/AdminDashboard";

const Dashboard = () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Admin",
  };

  return (
    <div>
      <UserDashboard />
      <AdminDashboard />
    </div>
  );
};

export default Dashboard;
