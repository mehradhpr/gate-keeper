// src/utils/jwt.ts

import jwt, { SignOptions, VerifyOptions, JwtPayload } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const privateKey = fs.readFileSync(path.join(process.cwd(), 'private.pem'), 'utf8');
const publicKey = fs.readFileSync(path.join(process.cwd(), 'public.pem'), 'utf8');

export function generateToken(payload: object): string {
    const signOptions: SignOptions = {
        expiresIn: '1h',
        algorithm: 'RS256'
    };

    return jwt.sign(payload, privateKey, signOptions);
}

export function verifyToken(token: string): JwtPayload | null | string {
    const verifyOptions: VerifyOptions = {
        algorithms: ['RS256'] // Algorithm used for verification
    };

    try {
        return jwt.verify(token, publicKey, verifyOptions);
    } catch (err) {
        return null; // Token verification failed
    }
}
