import bcrypt from "bcrypt";

// Define the number of salt rounds
const saltRounds = 10;

/**
 * Hashes a password using bcrypt.
 * @param password The plain text password to hash.
 * @returns The hashed password.
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, saltRounds);
}

/**
 * Compares a plain text password with a hashed password.
 * @param password The plain text password.
 * @param hashedPassword The hashed password.
 * @returns True if the passwords match, otherwise false.
 */
export async function comparePassword(
  password: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}
