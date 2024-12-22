import readifyContainer from "@/server/container";
import { KEYS } from "@/server/misc/constants";
import { IBooksService } from "@server/features/books/books.service";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const startTime = Date.now();
  const url = new URL(req.url);
  const pageSize = Number(
    url.searchParams.get("pageSize") ?? process.env.DEFAULT_PAGE_SIZE ?? "15"
  );
  const page = Number(url.searchParams.get("page") ?? "0");

  const booksService = readifyContainer.get<IBooksService>(KEYS.BOOKS_SERVICE);
  const books = await booksService.loadBooks();
  const totalPage = Math.ceil(books.data.length / Number(pageSize));
  if (page && Number(page) > totalPage) {
    return Response.json({
      message: "Page not found",
    });
  }

  const nextPage = Math.min(Number(page) + 1, totalPage);
  const prevPage = Math.max(Number(page) - 1, 0);
  const start = Number(page) * Number(pageSize);
  const end = start + Number(pageSize);
  const pageBooks = books.data.slice(start, end);

  return Response.json({
    data: pageBooks,
    page: Number(page),
    nextPage,
    prevPage,
    totalPage,
    pageSize,
    take: Date.now() - startTime,
  });
}
