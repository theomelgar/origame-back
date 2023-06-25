import { Users } from '@prisma/client';
import bcrypt from 'bcrypt';
import { duplicatedEmailError } from './errors';
import userRepository from '@/repositories/user-repository';

export async function createUser({ email, password, picture, username, birthday }: CreateUserParams): Promise<Users> {

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  const result = userRepository.create({
    email,
    password: hashedPassword,
    username,
    picture,
    birthday,
  });

  return result
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}


export type CreateUserParams = {
  email: string;
    password: string;
    username?: string;
    picture?: string;
    birthday?: Date;
};

const userService = {
  createUser,
};

export * from './errors';
export default userService;
