import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'dev-secret';

export function createJwt(userId: number) {
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, secret) as { userId: number };
}
