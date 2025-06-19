import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import prisma from '$lib/server/prisma';
import { createJwt } from '$lib/server/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const { name, password } = await request.json();

  if (!name || !password) {
    return json({ error: 'Заполните все поля' }, { status: 400 });
  }

  // !!! теперь prisma.user
  const user = await prisma.user.findUnique({
    where: { email: name }
  });

  if (!user) {
    return json({ error: 'Неверный логин или пароль' }, { status: 400 });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return json({ error: 'Неверный логин или пароль' }, { status: 400 });
  }

  const token = createJwt(user.id);

  cookies.set('jwt', token, {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 7
  });

  return json({ ok: true });
};
