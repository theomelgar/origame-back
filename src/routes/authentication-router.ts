import { Router } from 'express';
import { singInPost } from '../controllers/authentication-controller';
import { validateBody } from '@/middlewares';
import { signInSchema } from '../schemas';

const authenticationRouter = Router();

authenticationRouter.post('/sign-in', validateBody(signInSchema), singInPost);

export { authenticationRouter };
