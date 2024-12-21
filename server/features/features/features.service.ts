import { injectable } from "inversify";
import { Features } from "./features.entity";
import "reflect-metadata";

export interface IFeatureService {
  getFeatures(): Promise<Features>;
}

@injectable()
export default class FeatureService implements IFeatureService {
  getChangeMode(): boolean {
    return process.env.ALLOW_CHANGE_MODE === "true";
  }

  getChangeLanguage(): boolean {
    return process.env.ALLOW_CHANGE_LOCALE === "true";
  }

  async getFeatures(): Promise<Features> {
    return {
      allowChangeMode: this.getChangeMode(),
      allowChangeLocale: this.getChangeLanguage() || true,
    };
  }
}
