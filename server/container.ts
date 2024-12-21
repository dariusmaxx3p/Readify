import { Container } from "inversify";
import "reflect-metadata";
import PageService, { IPageService } from "./features/pages/pages.service";
import { KEYS } from "./misc/constants";
import FeatureService, {
  IFeatureService,
} from "./features/features/features.service";

const readifyContainer = new Container();
readifyContainer.bind<IPageService>(KEYS.PAGE_SERVICE).to(PageService);
readifyContainer.bind<IFeatureService>(KEYS.FEATURE_SERVICE).to(FeatureService);

export default readifyContainer;
