import express, { Express } from "express";
import cors from "cors";

import { loadEnv, connectDb, disconnectDB } from "./config";
import { authGoogle, authenticationRouter, tutorialsRouter, usersRouter } from "./routes";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/google-sign-in', authGoogle)
  .use('/tutorial', tutorialsRouter);
export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
