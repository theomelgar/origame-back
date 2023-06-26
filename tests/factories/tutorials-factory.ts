import { prisma } from '@/config';
import { createUser } from './users-factory';
import { Categories, Results } from '@prisma/client';
import { faker } from '@faker-js/faker';

export async function createTutorial () {
  const user = await createUser();
  const result = await createResult(user.id,faker.image.url());
  const category = await createCategory(faker.word.noun())

  return prisma.tutorials.create({
    data: {
      userId: user.id,
      resultId: result.id,
      title: faker.lorem.word(),
      description: faker.lorem.word(),
      categoryId: category.id,
    },
  });
}


export async function createCategory(name: string) : Promise<Categories>{
  return prisma.categories.create({
    data:{
      name
    }
  })
}

export async function createResult(userId: number, url: string) : Promise<Results>{
  return prisma.results.create({
    data:{
      userId,
      url
    }
  })
}

