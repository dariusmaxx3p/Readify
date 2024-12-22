export type Book = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  genres: string[];
  concepts: string[];
  authors: string[];
  publisher: string;
  edition: string;
  publishDate: string;
  coverImg?: string[];
};
