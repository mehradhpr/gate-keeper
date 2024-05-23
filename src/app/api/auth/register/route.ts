import { database } from "@/lib/db";
import {
  DBAddAccountRequest,
  DBAddAccountResponse,
} from "@/interfaces/db-interface";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { hashPassword } from "@/lib/hash";

// Validation schema
const schema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.string().optional().default("user"),
});

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const formData = req.body;

    // Server Side Validation
    const result = schema.safeParse(formData);
    if (!result.success) {
      return res
        .status(400)
        .json({ message: "Validation Failed", details: result.error.errors });
    }

    const { firstName, lastName, email, password, role } = result.data;

    // Business logic

    // Hash the password before storing it in the database
    const hashedPassword = await hashPassword(password);

    const dbAddAccountRequest: DBAddAccountRequest = {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    };

    const dbResponse: DBAddAccountResponse =
      await database.addAccount(dbAddAccountRequest);

    // Response
    if (dbResponse.success) {
      return res.status(201).json({ message: dbResponse.message });
    } else {
      return res.status(409).json({ message: dbResponse.message });
    }
  } catch (error) {
    console.error("Error registering account:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
