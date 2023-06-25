import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { createTutorialSchema } from '@/schemas/tutorial-schemas';
import {
  createOrUpdateTutorial,
  deleteTutorial,
  getAllTutorials,
  getTutorial,
} from '@/controllers/tutorials-controller';

const tutorialsRouter = Router();

tutorialsRouter
  .get('/', getAllTutorials)
  .get('/:id', getTutorial)
  .post('/', authenticateToken, validateBody(createTutorialSchema), createOrUpdateTutorial)
  .patch('/:id',authenticateToken, createOrUpdateTutorial)
  .delete('/:id', authenticateToken, deleteTutorial);

export { tutorialsRouter };