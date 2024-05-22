"use client";

import React, { createContext, useState, ReactNode, useContext } from "react";

import { TokenContextState, TokenProviderProps } from "@/interfaces/interfaces";

const TokenContext = createContext<TokenContextState | undefined>(undefined);

const TokenProvider: React.FC<TokenProviderProps> = ({ children }) => {
  const [token, setToken] = useState<string>("");

  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

// custom hook for useToken
const useToken = (): TokenContextState => {
  const context = useContext(TokenContext);
  if (context === undefined) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
};

export { TokenProvider, useToken };
