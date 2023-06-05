import { Router } from 'express';
import { authGoogleSignIn } from '../middlewares/auth-google-middleware';

const authGoogle = Router();
authGoogle.post('/', authGoogleSignIn);

export { authGoogle };
