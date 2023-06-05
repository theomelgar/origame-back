import { Prisma } from '@prisma/client';
import { prisma } from '@/config';

async function create(data: Prisma.SessionsUncheckedCreateInput) {
  return prisma.sessions.create({
    data,
  });
}

const sessionRepository = {
  create,
};

export default sessionRepository;
