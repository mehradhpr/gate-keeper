"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { ClientAccountInfo } from "@/interfaces/account-interface";
import { decode } from "jsonwebtoken";
import Cookies from "js-cookie";
import { useLoading } from "./LoadingContext";
import {useRouter} from "next/navigation";

interface AuthContextType {
  login: (loginFormData: {
    email: string;
    password: string;
  }) => void;
  logout: () => void;
  register: (registerFormData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => void;
  isAuthenticated: () => boolean;
  getClientUserInfo: () => ClientAccountInfo;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [clientUserInfo, setClientUserInfo] = useState<ClientAccountInfo>({
    firstName: "Guest",
    lastName: "Guest",
    email: "Guest",
    role: "Guest",
  });

  const { setLoading } = useLoading();

  // Load token and user info from cookies if they exist
  useEffect(() => {
    const savedToken = Cookies.get("authToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      const decoded = decode(savedToken);
      if (decoded) {
        setClientUserInfo(decoded as ClientAccountInfo);
      }
    }
  }, []);

  // shared methods
  const login = async (loginFormData: {
    email: string;
    password: string;
  }) => {
    try {
      setLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
      });
      if (response.ok) {
        const token = await response.json();
        Cookies.set("authToken", token, { expires: 7, secure: true });
        setToken(token);
        setIsLoggedIn(true);
        const decoded = decode(token);
        if (decoded) {
          setClientUserInfo(decoded as ClientAccountInfo);
        }
        console.log("User logged in successfully");
        router.push("/dashboard");
      } else {
        console.error("Login failed:", response.statusText);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    setToken(null);
    setIsLoggedIn(false);
    setClientUserInfo({
      firstName: "Guest",
      lastName: "Guest",
      email: "Guest",
      role: "Guest",
    });
  };

  const register = async (registerFormData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      // Perform an API fetch from auth/register
      setLoading(true);
      const response = await fetch("./api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerFormData),
      });
      if (response.ok) {
        console.log('User registered successfully');
        await login({email: registerFormData.email, password: registerFormData.password});
      }
    } catch (error) {
      // error is propagated from the database.addAccount function
      // TODO: Handle error response in the client side
      console.error("There was a problem with the fetch operation:", error);
    }
  }

  const isAuthenticated = () => {
    return token !== null && isLoggedIn;
  };

  const getClientUserInfo = () => {
    return clientUserInfo;
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, register, isAuthenticated, getClientUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
