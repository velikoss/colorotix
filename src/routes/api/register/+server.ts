import type { RequestHandler } from './$types';
import { json } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import prisma from '$lib/server/prisma';
const crypto = require('crypto');

export const POST: RequestHandler = async ({ request }) => {
  const { name, password, companyname, innnumber } = await request.json();

  if (!name || !password || !companyname || !innnumber) {
    return json({ error: 'Заполните все поля' }, { status: 400 });
  }

  const exists = await prisma.user.findUnique({
    where: { email: name }
  });

  if (exists) {
    return json({ error: 'Такой email уже зарегистрирован' }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const TABLE_PREFIX = 'c_';
  let raw = crypto.createHash('sha1').update(innnumber, 'utf8').digest('hex').slice(0, 8);
  let clientId = `${TABLE_PREFIX}${raw}`;

  await prisma.user.create({
    data: {
      email: name,
      passwordHash,
      companyName: companyname,
      inn: innnumber,
      companyId: clientId
    }
  });

  return json({ ok: true });
};
