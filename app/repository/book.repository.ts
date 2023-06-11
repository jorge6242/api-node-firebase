import { Service } from "typedi";
import { db } from "../../config/firebase";

@Service()
export default class BookRepository {
  model: any;
  constructor() {
    this.model = db.collection("Books");
  }
  async find(): Promise<any>{
    const document = db.collection("Books");
    const snapshot = await document.get() as any;
    const data = snapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return data
  }
}
