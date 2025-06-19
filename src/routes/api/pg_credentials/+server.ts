// src/routes/api/pg-credentials/+server.ts
import prisma from '$lib/server/prisma';         // ⬅ singleton-инстанс Prisma
import { json, error, type RequestHandler } from '@sveltejs/kit';

/**
 * POST /api/pg-credentials
 * Сохраняем строку подключения к Postgres текущего пользователя
 */
export const POST: RequestHandler = async ({ request, locals }) => {
	// ─── 1. Авторизация ─────────────────────────────────────────────────────────
	const { user } = locals as App.Locals;            // типизированный locals из app.d.ts
	if (!user) throw error(401, 'Unauthorized');

	// ─── 2. Парсим body и валидируем ────────────────────────────────────────────
	const { pgCredentials } = (await request.json()) as {
		pgCredentials?: string;
	};

	if (!pgCredentials?.trim())
		throw error(400, 'Empty pgCredentials');

	if (!/^postgresql:\/\/.+/i.test(pgCredentials))
		throw error(400, 'Invalid Postgres URL');

	// ─── 3. Записываем в БД ─────────────────────────────────────────────────────
	await prisma.user.update({
		where: { id: user.id },
		data:  { pgCredentials: pgCredentials.trim() }
	});

	// ─── 4. Ответ ───────────────────────────────────────────────────────────────
	return json({ ok: true });
};
