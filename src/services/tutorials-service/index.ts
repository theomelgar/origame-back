import { Tutorials } from "@prisma/client";
import { notFoundError } from "@/errors";
import userRepository from "@/repositories/user-repository";
import tutorialRepository from "@/repositories/tutorial-repository";
import { UpsertTutorialInput } from "@/protocols";

type TutorialInfo = {
  id: number;
  userId:number;
  title: string;
  description: string;
  resultUrl: string;
  images: object;
  category: string;
  createdAt: Date;
};

export async function createOrUpdateTutorial(
  data: UpsertTutorialInput
): Promise<Tutorials> {
  try {
    const tutorial = await tutorialRepository.createOrUpdateTutorial(data);
    return tutorial;
  } catch (error) {
    // Handle any errors here
    throw error;
  }
}

async function getAllTutorials(): Promise<TutorialInfo[]> {
  const tutorials = await tutorialRepository.getTutorial();
  const tutorialInfoList: TutorialInfo[] = [];

  for (const tutorial of tutorials) {
    const images = await tutorialRepository.getImagesById(tutorial.id);
    const resultUrl = await tutorialRepository.getResultById(tutorial.resultId);
    const category = await tutorialRepository.getCategoryById(tutorial.categoryId);

    const tutorialInfo: TutorialInfo = {
      id: tutorial.id,
      userId: tutorial.userId,
      title: tutorial.title,
      description: tutorial.description,
      resultUrl,
      images,
      category,
      createdAt: tutorial.createdAt,
    };

    tutorialInfoList.push(tutorialInfo);
  }

  return tutorialInfoList;
}

async function getTutorialById(id: number): Promise<TutorialInfo> {
  const tutorial = await tutorialRepository.getTutorialById(id);
  if (!tutorial) throw notFoundError();
  const images = await tutorialRepository.getImagesById(tutorial.id);
  const resultUrl = await tutorialRepository.getResultById(tutorial.resultId);
  const category = await tutorialRepository.getCategoryById(tutorial.categoryId);

  const tutorialInfo = {
    id: tutorial.id,
    userId:tutorial.userId,
    title: tutorial.title,
    description: tutorial.description,
    resultUrl,
    images,
    category,
    createdAt: tutorial.createdAt,
  };
  return tutorialInfo;
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
  getAllTutorials,
  getTutorialById,
  createOrUpdateTutorial,
  deleteTutorial,
};

export default tutorialService;
