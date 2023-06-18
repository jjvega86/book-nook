import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderArgs, LoaderFunction, json } from "@remix-run/node";
import { getBookDetail } from "~/services/books.server";

import { convert } from "html-to-text";

function removeHtmlTags(content: string | undefined) {
  if (typeof content === "string") {
    return convert(content);
  }

  return "";
}

type LoaderData = {
  book: Awaited<ReturnType<typeof getBookDetail>>;
};

export const loader: LoaderFunction = async ({ params }: LoaderArgs) => {
  const { bookId } = params;
  const book = await getBookDetail(bookId);
  return json<LoaderData>({ book });
};

const BookDetail = () => {
  const { book } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  return (
    <div className="max-w-[200px]">
      <h1>{book?.volumeInfo.title}</h1>
      <h2>{book?.volumeInfo.authors[0]}</h2>
      <p>{removeHtmlTags(book?.volumeInfo.description)}</p>
      <img
        className="h-48 object-cover max-w-[128px]"
        src={book?.volumeInfo.imageLinks.thumbnail}
        alt={book?.volumeInfo.title}
      />
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
};

export default BookDetail;
