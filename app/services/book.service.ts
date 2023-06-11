import { Service } from "typedi";
import BookRepository from '../repository/book.repository';

@Service()
export default class BookService {
  constructor(private repo: BookRepository){}
  async get() {
    try {
      const data = await this.repo.find();
      return data;
    } catch (error) {
      return { general: "Something went wrong, please try again" }
    }
  }

  async store() {
    try {
      const data = await this.repo.model.add({ description: 'test4444' });
      return data;
    } catch (error) {
      return { general: "Something went wrong, please try again" }
    }
  }
}
