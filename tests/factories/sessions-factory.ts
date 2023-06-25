import { Sessions } from '@prisma/client';
import { prisma } from '@/config';
import { createUser } from './users-factory';

export async function createSession(token: string): Promise<Sessions> {
  const user = await createUser();

  return prisma.sessions.create({
    data: {
      token: token,
      userId: user.id,
    },
  });
}