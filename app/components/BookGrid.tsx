import { Link } from "@remix-run/react";
import BookCard from "./BookCard";
import type { Book } from "~/utils/types";

type BookGridProps = {
  books: Book[];
};

const BookGrid = ({ books }: BookGridProps) => {
  return (
    <>
      {books
        .filter(
          (book: Book) => book.volumeInfo.imageLinks?.thumbnail !== undefined
        )
        .map((book: Book) => (
          <Link key={book.id} to={`/books/${book.id}`}>
            <BookCard
              title={book.volumeInfo.title}
              imageUrl={book.volumeInfo.imageLinks?.thumbnail}
              authors={book.volumeInfo.authors}
            />
          </Link>
        ))}
    </>
  );
};

export default BookGrid;
