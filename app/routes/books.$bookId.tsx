import { Link, useLoaderData } from "@remix-run/react";
import { LoaderArgs, json } from "@remix-run/node";
import { getBookDetail } from "~/services/books.server";

export const loader = async ({ params }: LoaderArgs) => {
  const { bookId } = params;
  const book = await getBookDetail(bookId);
  return json({ book });
};

const BookDetail = () => {
  const { book } = useLoaderData();
  return (
    <div>
      <h1>{book.volumeInfo.title}</h1>
      <Link prefetch="intent" to="/books/all">
        Back to books
      </Link>
    </div>
  );
};

export default BookDetail;
