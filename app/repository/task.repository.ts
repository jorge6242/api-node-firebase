import { Service } from "typedi";
import { db } from "../../config/firebase";
import { ITaskBodySchema, ITaskColletion } from "../schemas/tasks.schema";

@Service()
export default class TaskRepository {
  model: any;
  private collection = "Tasks";
  constructor() {
    this.model = db.collection(this.collection);
  }
  async find(): Promise<ITaskColletion[]> {
    const document = db.collection(this.collection);
    const snapshot = await document.get();
    const data = snapshot.docs.map((doc: { id: string; data: () => any }) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data;
  }
}
