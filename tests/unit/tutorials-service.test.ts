import { notFoundError } from "@/errors";
import TutorialRepository, {
  getTutorialById,
} from "@/repositories/tutorial-repository";
import tutorialService from "@/services/tutorials-service";
import { createTutorial } from "../factories";
import { prisma } from "@/config";

describe("getTutorialById", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return tutorial info when tutorial exists", async () => {
    const mockTutorialId = 1;
    const mockTutorial = {
      id: 1,
      userId: 123,
      title: "Sample Tutorial",
      description: "This is a sample tutorial",
      resultId: 456,
      categoryId: 789,
      createdAt: new Date("2022-01-01T00:00:00Z"),
      updatedAt: new Date("2022-01-01T00:00:00Z"),
    };
    const mockImages = [
      {
        id: 1,
        userId: 123,
        tutorialId: mockTutorialId,
        url: "https://example.com/image1.jpg",
        createdAt: new Date("2022-01-01T00:00:00Z"),
        updatedAt: new Date("2022-01-01T00:00:00Z"),
      },
      {
        id: 2,
        userId: 123,
        tutorialId: mockTutorialId,
        url: "https://example.com/image1.jpg",
        createdAt: new Date("2022-01-01T00:00:00Z"),
        updatedAt: new Date("2022-01-01T00:00:00Z"),
      },
    ];
    const mockResultUrl = "https://example.com/result.pdf";
    const mockCategory = "Sample Category";
    
    jest
      .spyOn(TutorialRepository, "getTutorialById")
      .mockResolvedValue(TutorialRepository.getTutorialById(mockTutorialId));
    jest
      .spyOn(TutorialRepository, "getImagesById")
      .mockResolvedValue(mockImages);
    jest
      .spyOn(TutorialRepository, "getResultById")
      .mockResolvedValue(mockResultUrl);
    jest
      .spyOn(TutorialRepository, "getCategoryById")
      .mockResolvedValue(mockCategory);

    const mockTutorialFilled = {
      id: mockTutorial.id,
      userId: mockTutorial.userId,
      title: mockTutorial.title,
      description: mockTutorial.description,
      resultUrl: mockResultUrl,
      images: mockImages,
      category: mockCategory,
      createdAt: mockTutorial.createdAt,
    };

    
    jest
      .spyOn(tutorialService, "getTutorialById")
      .mockResolvedValue(mockTutorialFilled);

    await expect(
      tutorialService.getTutorialById(mockTutorialId)
    ).resolves.toEqual(mockTutorialFilled);
  });
  it('should throw a "not found" error when tutorial does not exist', async () => {
    const mockTutorialId = 1; // Assuming you're testing with a tutorial ID of 1

    jest.spyOn(TutorialRepository, "getTutorialById").mockResolvedValue(null);

    await expect(
      tutorialService.getTutorialById(mockTutorialId)
    ).rejects.toEqual(notFoundError());
  });
  it("should return all tutorial info", async () => {
    const expectedTutorialInfoList = [
      {
        id: 1,
        userId: 123,
        title: "Sample Tutorial 1",
        description: "This is a sample tutorial 1",
        resultUrl: "https://example.com/result1.pdf",
        images: [
          {
            id: 1,
            userId: 123,
            tutorialId: 1,
            url: "https://example.com/image1.jpg",
            createdAt: new Date("2022-01-01T00:00:00Z"),
            updatedAt: new Date("2022-01-01T00:00:00Z"),
          },
          {
            id: 2,
            userId: 123,
            tutorialId: 1,
            url: "https://example.com/image2.jpg",
            createdAt: new Date("2022-01-01T00:00:00Z"),
            updatedAt: new Date("2022-01-01T00:00:00Z"),
          },
        ],
        category: "Category 1",
        createdAt: new Date("2022-01-01T00:00:00Z"),
      },
      {
        id: 2,
        userId: 456,
        title: "Sample Tutorial 2",
        description: "This is a sample tutorial 2",
        resultUrl: "https://example.com/result2.pdf",
        images: [
          {
            id: 3,
            userId: 456,
            tutorialId: 2,
            url: "https://example.com/image3.jpg",
            createdAt: new Date("2022-02-01T00:00:00Z"),
            updatedAt: new Date("2022-02-01T00:00:00Z"),
          },
        ],
        category: "Category 2",
        createdAt: new Date("2022-02-01T00:00:00Z"),
      },
    ];

    jest
      .spyOn(tutorialService, "getAllTutorials")
      .mockResolvedValue(expectedTutorialInfoList);

    await expect(tutorialService.getAllTutorials()).resolves.toEqual(
      expectedTutorialInfoList
    );
  });
});
