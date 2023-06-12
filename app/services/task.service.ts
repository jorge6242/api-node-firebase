import { Service } from "typedi";
import TaskRepository from "../repository/task.repository";
import { ITaskBodySchema, ITaskColletion } from "../schemas/tasks.schema";
import { db } from '../../config/firebase';

@Service()
export default class TaskService {
  constructor(private repo: TaskRepository) {}
  async find(): Promise<ITaskColletion[] | { message: string }> {
    try {
      const data = await this.repo.find();
      return data;
    } catch (error) {
      return { message: "Something went wrong, please try again" };
    }
  }

  async store(
    body: ITaskBodySchema["body"]
  ): Promise<ITaskColletion | { message: string, id?: string }> {
    try {
      const { title, description, status } = body;
      const res = await this.repo.model.add({ title, description, status });
      return { message: 'Task created', id: res.id };
    } catch (error) {
      return { message: "Something went wrong, please try again" };
    }
  }

  async update(
    id: string,
    body: ITaskBodySchema["body"]
  ): Promise<string | { message: string }> {
    try {
      await this.repo.model.doc(id).update({ ...body });
      return "Task updated";
    } catch (error: any) {
      if(error?.code === 5){
        return { message: "Document not exist" };
      } else {
        return { message: "Something went wrong, please try again" };
      }

    }
  }

  async delete(id: string) {
    try {
      await this.repo.model.doc(id).delete();
      return "Task deleted";
    } catch (error: any) {
      return { message: "Something went wrong, please try again" };
    }
  }
}
