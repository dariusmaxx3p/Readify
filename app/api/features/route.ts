import readifyContainer from "@/server/container";
import { KEYS } from "@/server/misc/constants";
import { IFeatureService } from "@server/features/features/features.service";

export async function GET() {
  const featureService = readifyContainer.get<IFeatureService>(
    KEYS.FEATURE_SERVICE
  );
  const features = await featureService.getFeatures();
  return Response.json({
    features,
  });
}
