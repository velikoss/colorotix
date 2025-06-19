import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';

/** Сбрасывает jwt-куку и завершает сессию */
export const POST: RequestHandler = async ({ cookies }) => {
	// удаляем cookie (должен совпадать с путём и флагами, которыми ставили jwt в login)
	cookies.delete('jwt', { path: '/' });

	return json({ ok: true });
};
