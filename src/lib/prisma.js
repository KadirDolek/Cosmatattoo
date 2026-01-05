import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';
import { join } from 'path';

const globalForPrisma = global;

// Configuration pour Prisma v7 avec LibSQL adapter
function createPrismaClient() {
  const dbUrl = `file:${join(process.cwd(), 'dev.db')}`;

  const adapter = new PrismaLibSql({
    url: dbUrl
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error']
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}
