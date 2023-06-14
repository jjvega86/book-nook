import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderArgs, json } from "@remix-run/node";
import { getBookDetail } from "~/services/books.server";

export const loader = async ({ params }: LoaderArgs) => {
  const { bookId } = params;
  const book = await getBookDetail(bookId);
  return json({ book });
};

const BookDetail = () => {
  const { book } = useLoaderData();
  const navigate = useNavigate();
  return (
    <div>
      <h1>{book.volumeInfo.title}</h1>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default BookDetail;
