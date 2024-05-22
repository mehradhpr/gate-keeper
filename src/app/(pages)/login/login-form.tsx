"use client";

import { FormEvent } from "react";
import { useToken } from "@/app/contexts/token-provider";
import { handleClientLogIn } from "@/lib/actions";

export default function LoginForm() {
  const { token, setToken } = useToken();

  return (
    <div className="bg-white p-6 w-80 shadow-md rounded">
      <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleClientLogIn}>
        <div className="mb-4">
          <label className="block font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="border w-full py-2 px-3"
            id="email-login"
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
            id="password-login"
            type="password"
            placeholder="Enter your password"
            name="password"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}
