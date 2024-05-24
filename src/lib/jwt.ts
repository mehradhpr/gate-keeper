import jwt, { SignOptions, VerifyOptions, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Read the keys directly from environment variables
const privateKey = process.env.PRIVATE_KEY ?? '';
const publicKey = process.env.PUBLIC_KEY ?? '';

if (!privateKey || !publicKey) {
  throw new Error('Environment variables PRIVATE_KEY and PUBLIC_KEY must be set');
}

export function generateToken(payload: object): string {
  const signOptions: SignOptions = {
    expiresIn: "1h",
    algorithm: "RS256",
  };

  try {
    const token = jwt.sign(payload, privateKey, signOptions);
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Token generation failed');
  }
}

export function verifyToken(token: string): JwtPayload | null | string {
  const verifyOptions: VerifyOptions = {
    algorithms: ["RS256"], // Algorithm used for verification
  };

  try {
    const decoded = jwt.verify(token, publicKey, verifyOptions);
    return decoded as JwtPayload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null; // Token verification failed
  }
}
