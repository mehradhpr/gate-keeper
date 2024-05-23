// app/dashboard/page.tsx

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Dashboard = () => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    role: "Admin",
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-100 p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 w-full max-w-6xl">
        <Card className="md:col-span-1 p-6 bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl">Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-xl font-bold">First Name</p>
              <p>{user.firstName}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Last Name</p>
              <p>{user.lastName}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Email</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Role</p>
              <p>{user.role}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 p-6 bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl">Work Desk</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl">
              Here you can place your work-related content.
            </p>
            {/* Add your work-related content here */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
