import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/hash";
import {
  DBAddAccountRequest,
  DBAddAccountResponse,
} from "@/interfaces/db-interface";
import { database } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const logInData = request.body;
  } catch (error) {}
}
