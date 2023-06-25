import { UpsertTutorialInput } from "@/protocols";
import { PrismaClient, Results, Tutorials } from "@prisma/client";
import dayjs from "dayjs";

const prisma = new PrismaClient();

export async function getTutorial() {
  const tutorials = await prisma.tutorials.findMany({
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return tutorials;
}

export async function getTutorialById(id: number): Promise<Tutorials | null> {
  const tutorial = await prisma.tutorials.findUnique({
    where: {
      id,
    },
  });

  return tutorial;
}

export async function createOrUpdateTutorial(
  data: UpsertTutorialInput
): Promise<Tutorials> {
  const { id, userId, resultUrl, title, description, images, category } = data;
  let tutorial: Tutorials;
  let result: Results;

  if (!id) {
    // If ID is not provided, create a new tutorial and result
    const existingCategory = await prisma.categories.findFirst({
      where: { name: { equals: category.toLowerCase() } },
    });

    if (existingCategory) {
      result = await prisma.results.create({
        data: {
          userId,
          url: resultUrl,
        },
      });
    } else {
      var newCategory = await prisma.categories.create({
        data: { name: category.toLowerCase() },
      });
      console.log(result);

      result = await prisma.results.create({
        data: {
          userId,
          url: resultUrl,
        },
      });
    }

    tutorial = await prisma.tutorials.create({
      data: {
        userId,
        resultId: result.id,
        title,
        description,
        categoryId: existingCategory?.id ?? newCategory.id,
      },
    });
  } else {
    // If ID is provided, update the existing tutorial
    tutorial = await prisma.tutorials.update({
      where: { id },
      data: {
        title,
        description,
        updatedAt: dayjs().format(),
      },
    });

    result = await prisma.results.update({
      where: { id: tutorial.resultId },
      data: {
        userId,
        url: resultUrl,
      },
    });
  }

  // Save the tutorial images
  const mediaPromises = images.map((imageUrl) =>
    prisma.media.create({
      data: {
        userId,
        tutorialId: tutorial.id,
        url: imageUrl,
      },
    })
  );

  await Promise.all(mediaPromises);

  return tutorial;
}

export async function getImagesById(tutorialId: number) {
  const images = await prisma.media.findMany({
    where: {
      tutorialId: tutorialId,
    },
  });
  return images;
}

export async function getResultById(id: number) {
  const result = await prisma.results.findFirst({
    where: {
      id: id,
    },
  });
  return result.url;
}

export async function getCategoryById(id: number) {
  const result = await prisma.categories.findFirst({
    where: {
      id: id,
    },
  });
  return result.name;
}
export async function deleteTutorial(id: number): Promise<Tutorials | null> {
  const tutorial = await prisma.tutorials.delete({
    where: {
      id,
    },
  });

  return tutorial;
}

const TutorialRepository = {
  createOrUpdateTutorial,
  getTutorial,
  getTutorialById,
  deleteTutorial,
  getImagesById,
  getResultById,
  getCategoryById,
};

export default TutorialRepository;
