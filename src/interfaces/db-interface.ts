import { ClientAccountInfo } from "@/interfaces/interfaces";

export interface DBRegisterRequestInfo {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface DBRegisterResponse {
  success: boolean;
  message: string;
}

export interface DBAuthenticateRequestInfo {
  email: string;
  password: string;
}

export interface DBAuthenticateResponse {
  success: boolean;
  message: string;
  account?: ClientAccountInfo;
}
