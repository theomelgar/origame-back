import { Tutorials } from '@prisma/client';
import { notFoundError } from '@/errors';
import userRepository from '@/repositories/user-repository';
import tutorialRepository from '@/repositories/tutorial-repository';
import { UpsertTutorialInput } from '@/protocols';

export async function createOrUpdateTutorial(data: UpsertTutorialInput): Promise<Tutorials> {
  try {
    const tutorial = await tutorialRepository.createOrUpdateTutorial(data);
    return tutorial;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
}

async function getAllTutorial(): Promise<Tutorials[]> {
  const tutorial = await tutorialRepository.getTutorial();

  return tutorial;
}

async function getTutorialById(id: number): Promise<Tutorials> {
  const tutorial = await tutorialRepository.getTutorialById(id);
  if (!tutorial) throw notFoundError();

  return tutorial;
}


async function deleteTutorial(userId: number, id: number): Promise<Tutorials> {
  const user = await userRepository.getUserById(userId);
  if (!user) throw notFoundError();

  const tutorial = await tutorialRepository.getTutorialById(id);
  if (!tutorial) throw notFoundError();

  const deletedTutorial = await tutorialRepository.deleteTutorial(id);

  return deletedTutorial;
}

const tutorialService = {
  getAllTutorial,
  getTutorialById,
  createOrUpdateTutorial,
  deleteTutorial,
};

export default tutorialService;
