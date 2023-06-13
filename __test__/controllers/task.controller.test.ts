import { ValidatedRequest } from "express-joi-validation";
import TasksController from "../../app/controllers/tasks.controller";
import TaskService from "../../app/services/task.service";
import APIResponse from "../../app/utils/response";
import { ITaskBodySchema } from "../../app/schemas/tasks.schema";
import { Request } from "express";

const TASK = { title: "Task 1", description: "Description 1", status: "completed" };

const TaskServiceMock = <jest.Mock<TaskService>>TaskService;
const taskServiceMock = new TaskServiceMock();

const ApiResponseMock = <jest.Mock<APIResponse>>APIResponse;
const apiResponseMock = new ApiResponseMock();

let taskController: TasksController;


describe("Task Controller", () => {
  beforeEach(() => {
    taskController = new TasksController(taskServiceMock, apiResponseMock);
  });

  test("Should be get tasks", async () => {
    const RESPONSE = { code: 200, message: [TASK] };
    jest.spyOn(taskServiceMock, "find").mockReturnValueOnce(Promise.resolve([TASK]));

    jest.spyOn(apiResponseMock, "success").mockReturnValue(RESPONSE);
    const mockRequest = {} as Request;
    const mockResponse: any = { json: jest.fn().mockReturnValue(RESPONSE) } as unknown as Response;
    const mockNextFunction = jest.fn();

    const res: any = await taskController.find(mockRequest, mockResponse, mockNextFunction);
    expect(res.message).toEqual(RESPONSE.message);
  });

  test("Should store task", async () => {
    const response = { code: 200, message: [TASK] };

    jest.spyOn(taskServiceMock, "store").mockReturnValueOnce(Promise.resolve(TASK));
    jest.spyOn(apiResponseMock, "success").mockReturnValue(response);
    const mockRequest = {
      body: TASK,
    } as ValidatedRequest<ITaskBodySchema>;
    const mockResponse: any = { json: jest.fn().mockReturnValue(response) } as unknown as Response;
    const mockNextFunction = jest.fn();

    const res: any = await taskController.store(mockRequest, mockResponse, mockNextFunction);
    expect(res.message).toEqual(response.message);
  });

  test("Should update task", async () => {
    const TASK_UPDATED = "Task updated";
    const response = { code: 200, message: TASK_UPDATED };

    const mockNextFunction = jest.fn();
    jest.spyOn(taskServiceMock, "update").mockReturnValueOnce(Promise.resolve(TASK_UPDATED));
    jest.spyOn(apiResponseMock, "success").mockReturnValue(response);

    const mockRequest = {
      body: TASK,
      params: { id: 1 },
    } as ValidatedRequest<ITaskBodySchema>;
    const mockResponse: any = { json: jest.fn().mockReturnValue(response) } as unknown as Response;

    const res: any = await taskController.update(mockRequest, mockResponse, mockNextFunction);
    expect(res.message).toEqual(response.message);
  });

  test("Should delete task", async () => {
    const TASK_DELETED = "Task deleted";
    const response = { code: 200, message: TASK_DELETED };

    jest.spyOn(taskServiceMock, "update").mockReturnValueOnce(Promise.resolve(TASK_DELETED));
    jest.spyOn(apiResponseMock, "success").mockReturnValue(response);

    const mockRequest = {
      params: { id: 1 },
    } as ValidatedRequest<ITaskBodySchema>;
    const mockResponse: any = { json: jest.fn().mockReturnValue(response) } as unknown as Response;
    const mockNextFunction = jest.fn();
    const res: any = await taskController.delete(mockRequest, mockResponse, mockNextFunction);
    expect(res.message).toEqual(response.message);
  });
});
