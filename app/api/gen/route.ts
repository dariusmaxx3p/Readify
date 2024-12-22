import readifyContainer from "@/server/container";
import { KEYS } from "@/server/misc/constants";
import { IGenService } from "@server/features/gen/gen.service";
import "reflect-metadata";

export async function GET(req: Request) {
  if (process.env.NODE_ENV !== "development") {
    return Response.json({
      message: "Not allowed",
    });
  }

  const url = new URL(req.url);
  const numBooks = url.searchParams.get("numBooks");
  const chunkSize = url.searchParams.get("chunkSize");

  const genService = readifyContainer.get<IGenService>(KEYS.GEN_SERVICE);
  await genService.genAndSaveBooks(
    Number(numBooks ?? 100_000),
    Number(chunkSize ?? 10_000),
    "books"
  );

  return Response.json({
    message: "Books generated and saved",
    data: {
      numBooks: numBooks ?? 100_000,
      chunkSize: chunkSize ?? 1_000,
    },
  });
}
