import { Prisma } from '@prisma/client';
import { prisma } from '../../config';

async function findByEmail(email: string, select?: Prisma.UsersSelect) {
  const params: Prisma.UsersFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.users.findUnique(params);
}

async function create(data: Prisma.UsersUncheckedCreateInput) {
  return prisma.users.create({
    data,
  });
}

async function findByEmailAndToken(email: string) {
  return prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      Sessions: {
        select: {
          token: true,
        },
      },
    },
  });
}

const userRepository = {
  findByEmail,
  create,
  findByEmailAndToken,
};

export default userRepository;
