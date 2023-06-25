import { Request, Response } from "express";
import httpStatus from "http-status";
import userService from "../services/users-service";

export async function usersPost(req: Request, res: Response) {
  const { email, password, picture, username, birthday } = req.body;

  try {
    const user = await userService.createUser({
      email,
      password,
      picture,
      username,
      birthday,
    });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
      username: user.username || user.email,
      picture: user.picture 
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
