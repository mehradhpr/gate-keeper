// app/account/page.tsx

"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const UserAccount = () => {
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email] = useState("john.doe@example.com"); // Email is usually not editable
  const [role] = useState("User"); // Role is usually not editable
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateProfile = () => {
    // Implement profile update logic
    console.log("Profile updated");
  };

  const handleChangePassword = () => {
    // Implement password change logic
    console.log("Password changed");
  };

  const handleDeleteAccount = () => {
    // Implement account deletion logic
    console.log("Account deleted");
  };

  return (
    <div className="min-h-screen flex items-center justify-center text-gray-100 p-8 -mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-6 bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">First Name</label>
              <Input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-500 border border-gray-600 rounded-md text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Last Name</label>
              <Input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-500 border border-gray-600 rounded-md text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={email}
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-500 border border-gray-600 rounded-md text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Role</label>
              <Input
                type="text"
                value={role}
                disabled
                className="mt-1 block w-full px-3 py-2 bg-gray-500 border border-gray-600 rounded-md text-gray-100"
              />
            </div>
            <Button
              onClick={handleUpdateProfile}
              className="w-full py-2 mt-4 bg-green-600 hover:bg-green-700 rounded-md text-gray-100"
            >
              Update Profile
            </Button>
            <Button
              onClick={handleDeleteAccount}
              className="w-full py-2 mt-4 bg-red-600 hover:bg-red-700 rounded-md text-gray-100"
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
        <Card className="p-6 bg-gray-800 text-gray-100">
          <CardHeader>
            <CardTitle className="text-2xl">Account Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">New Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-500 border border-gray-600 rounded-md text-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Confirm New Password</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-gray-500 border border-gray-600 rounded-md text-gray-100"
              />
            </div>
            <Button
              onClick={handleChangePassword}
              className="w-full py-2 mt-4 bg-blue-600 hover:bg-blue-700 rounded-md text-gray-100"
            >
              Change Password
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserAccount;
