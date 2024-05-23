// app/context/AuthContext.tsx
"use client";

import { createContext, useState, useContext, ReactNode } from "react";
import { ClientAccountInfo } from "@/interfaces/account-interface";
import { decode } from "jsonwebtoken";

interface AuthContextType {
  login: (token: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
  getClientUserInfo: () => ClientAccountInfo;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [clientUserInfo, setClientUserInfo] = useState<ClientAccountInfo>({
    firstName: "Guest",
    lastName: "Guest",
    email: "Guest",
    role: "Guest",
  });

  // shared methods
  const login = (token: string) => {
    setToken(token);
    setIsLoggedIn(true);
    const decoded = decode(token);
    if (decoded) {
      setClientUserInfo(decoded as ClientAccountInfo);
    }
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
  };

  const isAuthenticated = () => {
    return token !== null && isLoggedIn;
  };

  const getClientUserInfo = () => {
    return clientUserInfo;
  };

  return (
    <AuthContext.Provider
      value={{ login, logout, isAuthenticated, getClientUserInfo }}
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
