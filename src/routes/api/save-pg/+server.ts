import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

export async function POST({ request }) {
	try {
		const { pgUrl, companyId } = await request.json();

		if (
			!companyId ||
			typeof pgUrl !== 'string' ||
			!pgUrl.startsWith('postgresql://')
		) {
			return new Response('Неверные данные', { status: 400 });
		}

		// обновляем ВСЕ записи с таким companyId (обычно это одна запись)
		const { count } = await prisma.user.updateMany({
			where: { companyId },
			data:  { postgresData: pgUrl }
		});

		return json({ ok: true, updated: count });
	} catch (error) {
		console.error('Ошибка при сохранении строки подключения:', error);
		return new Response('Ошибка сервера', { status: 500 });
	}
}
