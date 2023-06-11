import { NextFunction, Request, Response } from "express";
import TaskService from "../services/task.service";
import { Service } from "typedi";
import { ValidatedRequest } from "express-joi-validation";
import { ITaskBodySchema } from "../schemas/tasks.schema";
import APIResponse from '../utils/response';

@Service()
export default class TasksController {
  constructor(private service: TaskService, private apiResponse: APIResponse) {}
  async find(_: Request, res: Response, next: NextFunction) {
    try {
      const data = await this.service.find();
      return res.json(this.apiResponse.success(data));
    } catch (error) {
      next(error);
    }
  }
  async store(
    req: ValidatedRequest<ITaskBodySchema>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const data = await this.service.store(body);
      return res.json(this.apiResponse.success(data));
    } catch (error) {
      next(error);
    }
  }

  async update(
    req: ValidatedRequest<ITaskBodySchema>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const body = req.body;
      const { id } = req.params;
      const data = await this.service.update(id, body);
      return res.json(this.apiResponse.success(data));
    } catch (error) {
      next(error);
    }
  }

  async delete(
    req: ValidatedRequest<ITaskBodySchema>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const data = await this.service.delete(id);
      return res.json(this.apiResponse.success(data));
    } catch (error) {
      next(error);
    }
  }
}
