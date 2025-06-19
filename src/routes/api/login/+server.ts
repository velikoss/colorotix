// src/routes/api/login/+server.ts
import type { RequestHandler } from './$types';
import { json, error } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import prisma from '$lib/server/prisma';
import { createJwt } from '$lib/server/auth';

/** POST /api/login */
export const POST: RequestHandler = async ({ request, cookies }) => {
	// 1. читаем данные из запроса
	const { name, password } = (await request.json()) as {
		name?: string;
		password?: string;
	};

	if (!name?.trim() || !password) {
		throw error(400, 'Заполните все поля');
	}

	// 2. ищем пользователя и сразу выбираем нужные поля
	const user = await prisma.user.findUnique({
		where: { email: name.toLowerCase().trim() },
		select: {
			id: true,
			passwordHash: true,
			companyId: true
		}
	});

	if (!user) {
		throw error(400, 'Неверный логин или пароль');
	}

	// 3. сверяем пароль
	const valid = await bcrypt.compare(password, user.passwordHash);
	if (!valid) {
		throw error(400, 'Неверный логин или пароль');
	}

	// 4. создаём JWT и кладём в http-only cookie
	const jwt = createJwt(user.id);

	cookies.set('jwt', jwt, {
		path: '/',
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 24 * 7 // 7 дней
	});

	// 5. отвечаем фронтенду
	return json({ ok: true, companyId: user.companyId });
};
