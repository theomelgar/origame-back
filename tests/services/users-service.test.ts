import {faker} from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { createUser as createUserSeed } from '../factories';
import { cleanDb } from '../helpers';
import userService, { duplicatedEmailError } from '@/services/users-service';
import { prisma } from '@/config';
import { init } from '@/app';

beforeAll(async () => {
  await init();
  await cleanDb();
});

describe('createUser', () => {
  it('should throw duplicatedUserError if there is a user with given email', async () => {
    const existingUser = await createUserSeed();

    try {
      await userService.createUser({
        email: existingUser.email,
        password: faker.internet.password({length: 6}),
      });
      fail('should throw duplicatedUserError');
    } catch (error) {
      expect(error).toEqual(duplicatedEmailError());
    }
  });

  it('should create user when given email is unique', async () => {
    const user = await userService.createUser({
      email: faker.internet.email(),
      password: faker.internet.password({length: 6}),
    });

    const dbUser = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
    });
    expect(user).toEqual(
      expect.objectContaining({
        id: dbUser.id,
        email: dbUser.email,
      }),
    );
  });

  it('should hash user password', async () => {
    const rawPassword = faker.internet.password({length: 6});
    const user = await userService.createUser({
      email: faker.internet.email(),
      password: rawPassword,
    });

    const dbUser = await prisma.users.findUnique({
      where: {
        id: user.id,
      },
    });
    expect(dbUser.password).not.toBe(rawPassword);
    expect(await bcrypt.compare(rawPassword, dbUser.password)).toBe(true);
  });
});
