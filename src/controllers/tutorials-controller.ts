import tutorialService from "@/services/tutorials-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function createOrUpdateTutorial(req: Request, res: Response) {
  const { id } = req.params;
  const { userId, resultUrl, title, description, images, category } = req.body;

  try {
    const tutorial = await tutorialService.createOrUpdateTutorial({
      id: id ? Number(id) : undefined,
      userId,
      resultUrl,
      title,
      description,
      images,
      category,
    });
    return res.status(httpStatus.CREATED).json(tutorial);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.status(httpStatus.NOT_FOUND).send(error);
    } else if (error.name === "BadRequestError") {
      return res.status(httpStatus.BAD_REQUEST).send(error);
    }

    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}
export async function getTutorial(req: Request, res: Response) {
  const { id } = req.params;
  
  try {
    const tutorial = await tutorialService.getTutorialById(Number(id));

    if (!tutorial) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: "Tutorial not found" });
    }

    return res.status(httpStatus.OK).json(tutorial);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function getAllTutorials(req: Request, res: Response) {
  try {
    const tutorials = await tutorialService.getAllTutorials();

    return res.status(httpStatus.OK).json(tutorials);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error);
  }
}

export async function deleteTutorial(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const deletedTutorial = await tutorialService.deleteTutorial(
      userId,
      Number(id)
    );
    if (!deletedTutorial) {
      res.status(404).json({ error: "Tutorial not found" });
    } else {
      res.json({ message: "Tutorial deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}
