import { Container } from "inversify";
import "reflect-metadata";
import PageService, { IPageService } from "./features/pages/pages.service";
import { KEYS } from "./misc/constants";
import FeatureService, {
  IFeatureService,
} from "./features/features/features.service";
import { GenService, IGenService } from "./features/gen/gen.service";

const readifyContainer = new Container();
readifyContainer.bind<IPageService>(KEYS.PAGE_SERVICE).to(PageService);
readifyContainer.bind<IFeatureService>(KEYS.FEATURE_SERVICE).to(FeatureService);
readifyContainer.bind<IGenService>(KEYS.GEN_SERVICE).to(GenService);

export default readifyContainer;
