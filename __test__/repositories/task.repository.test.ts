import * as admin from "firebase-admin";
import TaskRepository from "../../app/repository/task.repository";

let taskRepository: TaskRepository;

describe("Task Repository", () => {
  beforeEach(() => {
    taskRepository = new TaskRepository();
  });
  test("Should be get tasks", async () => {
    const TASK = {id: "1"};
    const get = jest.fn().mockReturnValue({ docs: [{ ...TASK, data: jest.fn() }] });
    jest.spyOn(admin.firestore(), "collection").mockReturnValue({ get } as unknown as any);

    const res = await taskRepository.find();
    expect(res).toEqual([TASK]);
  });
});
