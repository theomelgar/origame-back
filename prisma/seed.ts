import { PrismaClient, Tutorials } from '@prisma/client';
import { UpsertTutorialInput } from '@/protocols';
import { faker } from '@faker-js/faker/locale/de'

const prisma = new PrismaClient();

const createFakeUser = async () => {
  const email = faker.internet.email();
  const username = faker.internet.userName();
  const password = faker.internet.password();

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password,
    },
  });

  return user;
};

const createFakeResult = async () => {
  const url = faker.internet.url();

  const result = await prisma.results.create({
    data: {
      url,
    },
  });

  return result;
};

const createFakeCategory = async () => {
  const name = faker.lorem.word();

  const category = await prisma.categories.create({
    data: {
      name,
    },
  });

  return category;
};

const createFakeImage = async () => {
  const url = faker.internet.url();

  const image = await prisma.images.create({
    data: {
      url,
    },
  });

  return image;
};

const createFakeTutorial = async (userId: number) => {
  const title = faker.lorem.words(3);
  const description = faker.lorem.sentences(3);

  const result = await createFakeResult();
  const category = await createFakeCategory();

  const tutorial = await prisma.tutorials.create({
    data: {
      title,
      description,
      userId,
      resultId: result.id,
      categoryId: category.id,
    },
  });

  // Add fake images to the tutorial
  for (let i = 0; i < 3; i++) {
    const image = await createFakeImage();
    await prisma.media.create({
      data: {
        tutorialId: tutorial.id,
        url: faker.image,
      },
    });
  }

  return tutorial;
};

const seed = async () => {
  try {
    // Create fake user accounts
    const users = [];
    for (let i = 0; i < 5; i++) {
      const user = await createFakeUser();
      users.push(user);
    }

    // Create fake tutorials for each user
    for (const user of users) {
      for (let i = 0; i < 3; i++) {
        await createFakeTutorial(user.id);
      }
    }

    console.log('Seed completed successfully!');
  } catch (error) {
    console.error('Seed failed:', error);
  } finally {
    await prisma.$disconnect();
  }
};

seed();