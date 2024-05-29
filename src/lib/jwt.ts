import { SignJWT, jwtVerify, JWTPayload, importPKCS8, importSPKI } from 'jose';

// Read the keys directly from environment variables
const privateKeyPEM = process.env.PRIVATE_KEY ?? '';
const publicKeyPEM = process.env.PUBLIC_KEY ?? '';

if (!privateKeyPEM || !publicKeyPEM) {
  throw new Error('Environment variables PRIVATE_KEY and PUBLIC_KEY must be set');
}

// Import keys in the appropriate format
const privateKeyPromise = importPKCS8(privateKeyPEM, 'RS256');
const publicKeyPromise = importSPKI(publicKeyPEM, 'RS256');

export async function generateToken(payload: JWTPayload): Promise<string> {
  const privateKey = await privateKeyPromise;
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'RS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(privateKey);

  return token;
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
  const publicKey = await publicKeyPromise;

  try {
    const { payload } = await jwtVerify(token, publicKey, {
      algorithms: ['RS256'],
    });
    return payload;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null; // Token verification failed
  }
}
