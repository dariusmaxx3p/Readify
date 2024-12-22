import { Container } from "inversify";
import "reflect-metadata";
import PageService, { IPageService } from "./features/pages/pages.service";
import { KEYS } from "./misc/constants";
import FeatureService, {
  IFeatureService,
} from "./features/features/features.service";
import { GenService, IGenService } from "./features/gen/gen.service";
import BooksRepository, {
  IBooksRepository,
} from "./features/books/books.repository";
import BooksService, { IBooksService } from "./features/books/books.service";

const readifyContainer = new Container();
// repositories
readifyContainer
  .bind<IBooksRepository>(KEYS.BOOKS_REPOSITORY)
  .to(BooksRepository)
  .inSingletonScope();
// services
readifyContainer.bind<IPageService>(KEYS.PAGE_SERVICE).to(PageService);
readifyContainer.bind<IFeatureService>(KEYS.FEATURE_SERVICE).to(FeatureService);
readifyContainer.bind<IGenService>(KEYS.GEN_SERVICE).to(GenService);
readifyContainer.bind<IBooksService>(KEYS.BOOKS_SERVICE).to(BooksService);

export default readifyContainer;
