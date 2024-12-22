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
  const DEFAULT_NUM_BOOKS = 10_000;
  const DEFAULT_CHUNK_SIZE = 1_000;

  const genService = readifyContainer.get<IGenService>(KEYS.GEN_SERVICE);
  await genService.genAndSaveBooks(
    Number(numBooks ?? DEFAULT_NUM_BOOKS),
    Number(chunkSize ?? DEFAULT_CHUNK_SIZE),
    "books"
  );

  return Response.json({
    message: "Books generated and saved",
    data: {
      numBooks: numBooks ?? DEFAULT_NUM_BOOKS,
      chunkSize: chunkSize ?? DEFAULT_CHUNK_SIZE,
    },
  });
}
