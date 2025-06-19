import { PrismaClient } from '@prisma/client';

declare global {
  // в dev-режиме предотвращаем дубли клиентов
  var __prisma: PrismaClient | undefined;
}

const prisma = globalThis.__prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.__prisma = prisma;
}

export default prisma;
