// app/components/UserDashboard.tsx
"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function UserDashboard() {
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'User'
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-100 p-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3 w-full max-w-6xl">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <p className="text-xl font-bold">First Name: {user.firstName}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Last Name: {user.lastName}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Email: {user.email}</p>
            </div>
            <div>
              <p className="text-xl font-bold">Role: {user.role}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 p-6 bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl">Accessible Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xl">View Own Account</p>
            <p className="text-xl">Delete Own Account</p>
            <p className="text-xl">Update Own Account (Change first name, last name, password)</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default UserDashboard;
