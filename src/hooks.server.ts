import type { Handle } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { verifyJwt } from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('jwt');

  if (token) {
    try {
      const { userId } = verifyJwt(token);

      // опять же prisma.user
      event.locals.user = await prisma.user.findUnique({
        where: { id: userId }
      });
    } catch {
      event.cookies.delete('jwt', { path: '/' });
    }
  }

  return resolve(event);
};
