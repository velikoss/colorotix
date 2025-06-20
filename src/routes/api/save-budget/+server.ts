import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';

/**
 * POST /api/save-budget
 * Body: { yearBudget: number, companyId: string }
 */
export async function POST({ request }) {
	try {
		const { yearBudget, companyId } = await request.json();

		if (!companyId || typeof yearBudget !== 'number' || Number.isNaN(yearBudget)) {
			return new Response('Неверные данные', { status: 400 });
		}

		// обновляем ВСЕ записи с таким companyId (обычно это одна запись)
		const { count } = await prisma.user.updateMany({
			where: { companyId },
			data:  { yearBudget }
		});

		return json({ ok: true, updated: count });
	} catch (error) {
		console.error('Ошибка при сохранении бюджета:', error);
		return new Response('Ошибка сервера', { status: 500 });
	}
}
