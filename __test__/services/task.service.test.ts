import admin from "firebase-admin";
import TaskRepository from "../../app/repository/task.repository";
import TaskService from "../../app/services/task.service";

// Create a fake Firestore with a `users` and `posts` collection

// Create a fake Firestore with a `users` and `posts` collection

const TaskRepositoryMock = <jest.Mock<TaskRepository>>TaskRepository;
const taskRepositoryMock = new TaskRepositoryMock();

let taskService: TaskService;

describe("Task Service", () => {

  beforeEach(() => {
    taskService = new TaskService(taskRepositoryMock);
  });

  test("Should be get tasks", async () => {
    const store = jest.fn();
    const doc = jest.fn().mockReturnValue({ store });
    jest.spyOn(admin.firestore(), "collection").mockReturnValue({ doc } as unknown as any);
    const response = [{ title: "Task 1", description: "Description 1", status: "completed" }];
    jest.spyOn(taskRepositoryMock, "find").mockReturnValueOnce(Promise.resolve([{ title: "Task 1", description: "Description 1", status: "completed" }]));
    const res: any = await taskService.find();
    expect(res).toEqual(response);
  });

  test("Should be store tasks", async () => {
    const update = jest.fn();
    const doc = jest.fn().mockReturnValue({ update });
    jest.spyOn(admin.firestore(), "collection").mockReturnValue({ doc } as unknown as any);

    const TASK_CREATED = "Task created";
    const task = {
      title: "Test task",
      description: "This is a test task",
      status: "pending",
    };

    const res: any = await taskService.store(task);
    expect(res.message).toEqual(TASK_CREATED);
  });

  test("Should be update tasks", async () => {
    const update = jest.fn();
    const doc = jest.fn().mockReturnValue({ update });
    jest.spyOn(admin.firestore(), "collection").mockReturnValue({ doc } as unknown as any);

    const TASK_UPDATED = "Task updated";
    const createTaskMock: { id?: string; title: string; description: string; status: string } = {
      title: "Test task",
      description: "This is a test task",
      status: "pending",
    };
    const updatedTaskMock = {
      title: "Updated test task",
      description: "This is an updated test task",
      status: "completed",
    };

    const addedTask: any = await taskService.store(createTaskMock);
    const res: any = await taskService.update(addedTask?.id ? addedTask.id : "", updatedTaskMock);
    expect(res).toEqual(TASK_UPDATED);
  });

  test("Should be fail update task", async () => {
    const update = jest.fn();
    const doc = jest.fn().mockReturnValue({ update });
    jest.spyOn(admin.firestore(), "collection").mockReturnValue({ doc } as unknown as any);

    const ERROR = { message: "Document not exist" };
    const updatedTaskMock = {
      title: "Updated test task",
      description: "This is an updated test task",
      status: "completed",
    };
    const res: any = await taskService.update("test", updatedTaskMock);
    expect(res).toEqual(ERROR);
  });

  test("Should be delete tasks", async () => {
    const deletemockFn = jest.fn();
    const doc = jest.fn().mockReturnValue({ delete: deletemockFn });
    jest.spyOn(admin.firestore(), "collection").mockReturnValue({ doc } as unknown as any);

    const TASK_DELETED = "Task deleted";
    const createTaskMock: { id?: string; title: string; description: string; status: string } = {
      title: "Test task",
      description: "This is a test task",
      status: "pending",
    };
    const addedTask: any = await taskService.store(createTaskMock);
    const res: any = await taskService.delete(addedTask?.id ? addedTask.id : "");
    expect(res).toEqual(TASK_DELETED);
  });
});
