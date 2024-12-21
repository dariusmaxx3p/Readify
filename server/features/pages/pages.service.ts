import { injectable } from "inversify";
import "reflect-metadata";
import { Page } from "./pages.entity";

export interface IPageService {
  getPages(): Promise<Page[]>;
}

@injectable()
export default class PageService implements IPageService {
  async getPages(): Promise<Page[]> {
    return [
      {
        key: "home",
        href: "/",
      },
      {
        key: "books",
        href: "/books",
      },
      {
        key: "about",
        href: "/about",
      },
    ];
  }
}
