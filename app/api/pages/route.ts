import readifyContainer from "@/server/container";
import { KEYS } from "@/server/misc/constants";
import { IPageService } from "@server/features/pages/pages.service";
import "reflect-metadata";

export async function GET() {
  const pageService = readifyContainer.get<IPageService>(KEYS.PAGE_SERVICE);
  const pages = await pageService.getPages();
  return Response.json({
    pages,
  });
}
