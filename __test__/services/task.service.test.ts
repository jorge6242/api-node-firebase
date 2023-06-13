import admin from "firebase-admin";
import TaskRepository from "../../app/repository/task.repository";
import TaskService from "../../app/services/task.service";

const TASK_MOCK = { title: "TEST - Task 1", description: "TEST - Description 1", status: "completed" };
const TASK_UPDATE_MOCK = { title: "TEST - Task 2", description: "TEST - Description 2", status: "pending" };

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
    const response = [TASK_MOCK];
    jest.spyOn(taskRepositoryMock, "find").mockReturnValueOnce(Promise.resolve([TASK_MOCK]));
    const res: any = await taskService.find();
    expect(res).toEqual(response);

  });

  test("Should be store tasks", async () => {
    const update = jest.fn();
    const doc = jest.fn().mockReturnValue({ update });
    jest.spyOn(admin.firestore(), "collection").mockReturnValue({ doc } as unknown as any);

    const TASK_CREATED = "Task created";

    const res: any = await taskService.store(TASK_MOCK);
    expect(res.message).toEqual(TASK_CREATED);
    await taskService.delete(res.id);
  });

  test("Should be update tasks", async () => {
    const update = jest.fn();
    const doc = jest.fn().mockReturnValue({ update });
    jest.spyOn(admin.firestore(), "collection").mockReturnValue({ doc } as unknown as any);

    const TASK_UPDATED = "Task updated";

    const addedTask: any = await taskService.store(TASK_MOCK);
    const res: any = await taskService.update(addedTask?.id ? addedTask.id : "", TASK_UPDATE_MOCK);
    expect(res).toEqual(TASK_UPDATED);
    await taskService.delete(addedTask.id);
  });

  test("Should be fail update task", async () => {
    const update = jest.fn();
    const doc = jest.fn().mockReturnValue({ update });
    jest.spyOn(admin.firestore(), "collection").mockReturnValue({ doc } as unknown as any);

    const ERROR = { message: "Document not exist" };

    const res: any = await taskService.update("test", TASK_MOCK);
    expect(res).toEqual(ERROR);
  });

  test("Should be delete tasks", async () => {
    const deletemockFn = jest.fn();
    const doc = jest.fn().mockReturnValue({ delete: deletemockFn });
    jest.spyOn(admin.firestore(), "collection").mockReturnValue({ doc } as unknown as any);

    const TASK_DELETED = "Task deleted";
    const addedTask: any = await taskService.store(TASK_MOCK);
    const res: any = await taskService.delete(addedTask?.id ? addedTask.id : "");
    expect(res).toEqual(TASK_DELETED);
    await taskService.delete(addedTask.id);
  });
});
