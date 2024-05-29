"use client";

import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { ClientAccountInfo } from "@/interfaces/account-interface";

interface AuthContextType {
  login: (loginFormData: { email: string; password: string }) => void;
  logout: () => void;
  register: (registerFormData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => void;
  isAuthenticated: () => boolean;
  getClientUserInfo: () => ClientAccountInfo;
  isAuthLoading: boolean;
  setAuthLoading: (loading: boolean) => void;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clientUserInfo, setClientUserInfo] = useState<ClientAccountInfo>({
    firstName: "Guest",
    lastName: "Guest",
    email: "Guest",
    role: "Guest",
  });
  const [isAuthLoading, setAuthLoading] = useState(false);

  const deleteAccount = async () => {
    try {
      setAuthLoading(true);
      const response = await fetch("/api/auth/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.ok) {
        await logout();
        console.log(response.statusText);
      }
      setAuthLoading(false);
    } catch (error) {
      console.error("AuthContext Internal Error - Deleting Account Failed:", error);
    }
  }

  const fetchUserInfo = async () => {
    try {
      setAuthLoading(true);
      const response = await fetch("/api/auth/user", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setClientUserInfo(data);
      } else {
        setIsLoggedIn(false);
        setClientUserInfo({
          firstName: "Guest",
          lastName: "Guest",
          email: "Guest",
          role: "Guest",
        });
      }
      setAuthLoading(false);
      console.log(response.statusText);
    } catch (error) {
      setIsLoggedIn(false);
      setClientUserInfo({
        firstName: "Guest",
        lastName: "Guest",
        email: "Guest",
        role: "Guest",
      });
      console.log("AuthContext Internal Error - Fetching User Info failed:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, [isLoggedIn]);

  const login = async (loginFormData: { email: string; password: string }) => {
    try {
      setAuthLoading(true);
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginFormData),
        credentials: "include",
      });
      if (response.ok) {
        await fetchUserInfo();
      }
      console.log(response.statusText);
    } catch (error) {
      console.error("AuthContext Internal Error - logging in failed:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    try {
      setAuthLoading(true);
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        setIsLoggedIn(false);
        setClientUserInfo({
          firstName: "Guest",
          lastName: "Guest",
          email: "Guest",
          role: "Guest",
        });
      }
      console.log(response.statusText);
    } catch (error) {
      console.error("AuthContext Internal Error - logging out failed:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const register = async (registerFormData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    try {
      setAuthLoading(true);
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerFormData),
        credentials: "include",
      });
      if (response.ok) {
        await login({ email: registerFormData.email, password: registerFormData.password });
        console.log("User registered successfully");
      }
    } catch (error) {
      console.error("AuthContext Internal Error - Registration Failed:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  const isAuthenticated = () => {
    return isLoggedIn;
  };

  const getClientUserInfo = () => {
    return clientUserInfo;
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, register, isAuthenticated, getClientUserInfo, isAuthLoading, setAuthLoading, deleteAccount }}
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
