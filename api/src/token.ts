import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'shhhhh';

export function generateToken(payload: any, expiresInSeconds: number = 3600) {
  return jwt.sign(payload, SECRET, { expiresIn: expiresInSeconds });
}

export function verifyToken(token: string) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) reject(err);
      resolve(decoded);
    });
  });
}