import { Book } from "@/server/domain/book";
import { injectable } from "inversify";
import "reflect-metadata";
import books0 from "@/app/data/books-0.json";
import books1 from "@/app/data/books-1.json";
import books2 from "@/app/data/books-2.json";
import books3 from "@/app/data/books-3.json";
import books4 from "@/app/data/books-4.json";
import books5 from "@/app/data/books-5.json";
import books6 from "@/app/data/books-6.json";
import books7 from "@/app/data/books-7.json";
import books8 from "@/app/data/books-8.json";
import books9 from "@/app/data/books-9.json";

export interface IBooksRepository {
  loadBooks(): Promise<Book[]>;
}

@injectable()
export default class BooksRepository implements IBooksRepository {
  async loadBooks(): Promise<Book[]> {
    return [
      ...(books0 as Book[]),
      ...(books1 as Book[]),
      ...(books2 as Book[]),
      ...(books3 as Book[]),
      ...(books4 as Book[]),
      ...(books5 as Book[]),
      ...(books6 as Book[]),
      ...(books7 as Book[]),
      ...(books8 as Book[]),
      ...(books9 as Book[]),
    ];
  }
}
