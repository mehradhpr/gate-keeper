// app/components/AdminDashboard.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AdminDashboard() {
  const admin = {
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    role: 'Admin'
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
              <p className="text-xl font-bold">First Name: {admin.firstName}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Last Name: {admin.lastName}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Email: {admin.email}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Role: {admin.role}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 p-6 bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl">Accessible Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl">View User Accounts</p>
            <p className="text-xl">Delete a User Account</p>
            <p className="text-xl">Update a User Account (Change first name, last name, password)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
