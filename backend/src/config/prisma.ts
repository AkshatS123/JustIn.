import { PrismaClient } from '@prisma/client';

// It's best practice to instantiate a single PrismaClient instance and re-use it across your application.
// https://www.prisma.io/docs/concepts/components/prisma-client/instantiation

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error'],
});

export { prisma }; 