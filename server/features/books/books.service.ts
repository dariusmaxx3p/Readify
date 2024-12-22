import { Book } from "@/server/domain/book";
import { KEYS } from "@/server/misc/constants";
import { inject, injectable } from "inversify";
import type { IBooksRepository } from "./books.repository";

export type BookServiceResponse<T> = {
  data: T;
  take: number;
};

export interface IBooksService {
  loadBooks(): Promise<BookServiceResponse<Book[]>>;
  findBooksByTitle(title: string): Promise<BookServiceResponse<Book[]>>;
  findBooksById(id: string): Promise<BookServiceResponse<Book | undefined>>;
  findBooksByAuthor(author: string): Promise<BookServiceResponse<Book[]>>;
  findBooksByGenre(genre: string): Promise<BookServiceResponse<Book[]>>;
}

@injectable()
export default class BooksService implements IBooksService {
  private _books: Book[] = [];
  constructor(
    @inject(KEYS.BOOKS_REPOSITORY) private booksRepository: IBooksRepository
  ) {}

  async loadBooks(): Promise<BookServiceResponse<Book[]>> {
    const startTime = Date.now();
    if (this._books.length === 0) {
      this._books = await this.booksRepository.loadBooks();
    }

    return {
      data: this._books,
      take: Date.now() - startTime,
    };
  }

  async findBooksByTitle(title: string): Promise<BookServiceResponse<Book[]>> {
    const startTime = Date.now();
    const allBooks = await this.loadBooks();
    for (const book of allBooks.data) {
      if (book.title === title) {
        return {
          data: [book],
          take: Date.now() - startTime,
        };
      }
    }

    return {
      data: [],
      take: Date.now() - startTime,
    };
  }

  async findBooksById(
    id: string
  ): Promise<BookServiceResponse<Book | undefined>> {
    const startTime = Date.now();
    const allBooks = await this.loadBooks();
    for (const book of allBooks.data) {
      if (book.id === id) {
        return {
          data: book,
          take: Date.now() - startTime,
        };
      }
    }

    return {
      data: undefined,
      take: Date.now() - startTime,
    };
  }

  async findBooksByAuthor(
    author: string
  ): Promise<BookServiceResponse<Book[]>> {
    const startTime = Date.now();
    const allBooks = await this.loadBooks();

    const books: Book[] = [];
    for (const book of allBooks.data) {
      if (book.authors.includes(author)) {
        books.push(book);
      }
    }

    return {
      data: books,
      take: Date.now() - startTime,
    };
  }

  async findBooksByGenre(genre: string): Promise<BookServiceResponse<Book[]>> {
    const startTime = Date.now();
    const allBooks = await this.loadBooks();

    const books: Book[] = [];
    for (const book of allBooks.data) {
      if (book.genres.includes(genre)) {
        books.push(book);
      }
    }

    return {
      data: books,
      take: Date.now() - startTime,
    };
  }
}
