import { Users } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { invalidCredentialsError } from './errors';
import { exclude } from '@/utils/prisma-utils';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/session-repository';
import { number } from 'joi';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  const data = await userRepository.getUserById(user.id) 
  return {
    user:{
      id: user.id,
      email: user.email,
      picture: data.picture,
      username:data.username,
    },
    token,
  };
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '24h', // Set the expiration time (e.g., 1 hour)
  });

  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<Users, 'email' | 'password'>;

type SignInResult = {
  user:{
    id: number;
  email:string;
  username:string,
  picture:string;
  },
  token: string;
};

type GetUserOrFailResult = Pick<Users, 'id' | 'email' | 'password'>;

const authenticationService = {
  signIn,
  createSession,
};

export default authenticationService;
export * from './errors';
