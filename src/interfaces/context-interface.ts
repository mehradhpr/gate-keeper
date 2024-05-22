import { ReactNode } from "react";

export interface TokenContextState {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export interface TokenProviderProps {
  children: ReactNode;
}
