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
          <BookCard
            key={book.id}
            title={book.volumeInfo.title}
            imageUrl={book.volumeInfo.imageLinks?.thumbnail}
            authors={book.volumeInfo.authors}
          />
        ))}
    </>
  );
};

export default BookGrid;
