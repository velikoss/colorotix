import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'dev-secret';

export function createJwt(userId: number) {
  return jwt.sign({ userId }, secret, { expiresIn: '7d' });
}

export function verifyJwt(token: string): { id: number } {
	const payload = jwt.verify(token, process.env.JWT_SECRET!) as { id: number };
	return payload;
}
