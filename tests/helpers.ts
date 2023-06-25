import * as jwt from 'jsonwebtoken';
import { Users } from '@prisma/client';
import { createUser } from './factories';
import { createSession } from './factories/sessions-factory';
import { prisma } from '@/config';

export async function cleanDb() {
  await prisma.sessions.deleteMany({});
  await prisma.users.deleteMany({});
}

export async function generateValidToken(user?: Users) {
  const incomingUser = user || (await createUser());
  const token = jwt.sign({ userId: incomingUser.id }, process.env.JWT_SECRET);

  await createSession(token);

  return token;
}
