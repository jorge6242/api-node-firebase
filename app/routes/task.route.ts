import Container from "typedi";
import express, { NextFunction, Request, Response } from "express";
import TasksController from "../controllers/tasks.controller";
import { ValidatedRequest, createValidator } from "express-joi-validation";
import {
  ITaskBodySchema,
  ITaskParamSchema,
  taskBodySchema,
  paramTaskSchema,
} from "../schemas/tasks.schema";

const validator = createValidator();
const router = express.Router();
const controller = Container.get(TasksController);

router.get("/", async (req: Request, res: Response, next: NextFunction) =>
  controller.find(req, res, next)
);

router.post(
  "/",
  validator.body(taskBodySchema),
  (
    req: ValidatedRequest<ITaskBodySchema>,
    res: Response,
    next: NextFunction
  ) => controller.store(req, res, next)
);

router.put(
  "/:id",
  validator.params(paramTaskSchema),
  validator.body(taskBodySchema),
  (
    req: ValidatedRequest<ITaskBodySchema>,
    res: Response,
    next: NextFunction
  ) => controller.update(req, res, next)
);

router.delete(
  "/:id",
  validator.params(paramTaskSchema),
  (
    req: ValidatedRequest<ITaskParamSchema>,
    res: Response,
    next: NextFunction
  ) => controller.delete(req, res, next)
);

export default router;
