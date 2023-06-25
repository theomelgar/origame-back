import bcrypt from 'bcrypt';
import {faker} from '@faker-js/faker';
import { Users } from '@prisma/client';
import { prisma } from '@/config';

export async function createUser(params: Partial<Users> = {}): Promise<Users> {
  const incomingPassword = params.password || faker.internet.password({length: 6});
  const hashedPassword = await bcrypt.hash(incomingPassword, 10);

  return prisma.users.create({
    data: {
      email: params.email || faker.internet.email(),
      password: hashedPassword,
      // username: params.username || faker.person.firstName(),
      // picture: params.picture || faker.image.avatar(),
      // birthday: params.birthday || faker.date.past(),
    },
  });
}
