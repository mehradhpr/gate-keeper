'use client'

import { FormEvent, useState } from 'react';

export default function RegistrationForm() {
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const form = event.currentTarget;
        const firstName = (form.elements.namedItem('firstName') as HTMLInputElement).value;
        const lastName = (form.elements.namedItem('lastName') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;
        const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        setError(null);

        const formData = { firstName, lastName, email, password };

        // sending the form data to the server
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
    }

    return (
        <div className="bg-white p-6 w-80 shadow-md rounded">
            <h2 className="text-center text-2xl font-bold mb-4">Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="firstName">
                        First Name
                    </label>
                    <input
                        className="border w-full py-2 px-3"
                        id="firstName-register"
                        type="text"
                        placeholder="Enter your first name"
                        name="firstName"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="lastName">
                        Last Name
                    </label>
                    <input
                        className="border w-full py-2 px-3"
                        id="lastName-register"
                        type="text"
                        placeholder="Enter your last name"
                        name="lastName"
                    />
                </div>
                <div className="mb-4">
                    <label className="block font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="border w-full py-2 px-3"
                        id="email-register"
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                    />
                </div>
                <div className="mb-6">
                    <label className="block font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="border w-full py-2 px-3"
                        id="password-register"
                        type="password"
                        placeholder="Enter your password"
                        name="password"
                    />
                </div>
                <div className="mb-6">
                    <label className="block font-bold mb-2" htmlFor="confirm-password">
                        Confirm Password
                    </label>
                    <input
                        className="border w-full py-2 px-3"
                        id="confirm-password"
                        type="password"
                        placeholder="Confirm your password"
                        name="confirmPassword"
                    />
                </div>
                {error && (
                    <div className="mb-4 text-red-600">
                        {error}
                    </div>
                )}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}