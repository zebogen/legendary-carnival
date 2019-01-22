import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'shhhhh';

export interface TokenPayload {
  email: string;
  id: number;
}

export function generateToken(payload: any, expiresInSeconds: number = 3600) {
  return jwt.sign(payload, SECRET, { expiresIn: expiresInSeconds });
}

export function verifyToken(token: string): Promise<TokenPayload> {
  return new Promise((resolve, reject) => {
    jwt.verify(token.replace('Bearer ', ''), SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded as TokenPayload);
    });
  });
}