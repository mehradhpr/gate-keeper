// src/app/(pages)/dashboard/page.tsx

'use client'

import { useState, useEffect } from 'react';

import { useAppContext } from "@/app/contexts/context-provider";

export default function DashboardPage() {
const { token, account, hasAccess, isAdmin,
    setHasAccess, setIsAdmin,
    setToken, setAccount } = useAppContext();

    const handleLogout = () => {
        // Implement your logout functionality here
        console.log('User logged out');
    };

    useEffect(() => {
        if (hasAccess) {

        }
    }, []);

    return (
        <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-gray-100">
            <div className={`bg-white p-6 w-80 shadow-md rounded ${hasAccess ? (isAdmin ? 'bg-yellow-100' : '') : 'bg-red-100'}`}>
                <h2 className="text-center text-2xl font-bold mb-4">Dashboard</h2>
                {hasAccess ? (
                    <>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">First Name</label>
                            <p className="py-2">{account.firstName}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Last Name</label>
                            <p className="py-2">{account.lastName}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Email</label>
                            <p className="py-2">{account.email}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block font-bold mb-2">Role</label>
                            <p className="py-2">{account.role}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="text-red-700 font-bold">
                        You do not have access to view this information.
                    </div>
                )}
            </div>
            {isAdmin && hasAccess && (
                <div className="bg-yellow-100 p-6 w-80 shadow-md rounded">
                    <h2 className="text-center text-2xl font-bold mb-4">Admin Page</h2>
                    <div className="mb-4">
                        <label className="block font-bold mb-2">Admin Settings</label>
                        <ul className="list-disc list-inside py-2 px-3">
                            <li>Add Users</li>
                            <li>Remove Users</li>
                            <li>Modify Users</li>
                            <li>Create New Roles</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
