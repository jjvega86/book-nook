import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { LoaderArgs, LoaderFunction, json } from "@remix-run/node";
import { getBookDetail } from "~/services/books.server";

function removeHtmlTags(content: string | undefined) {
  if (typeof content === "string") {
    const doc = new DOMParser().parseFromString(content, "text/html");
    return doc.body.textContent;
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

/* As a *user*, I want the **BookDetailPage** to display details of that book 
coming from the Google Books API, 
including **title, author(s), description, and a full-sized thumbnail** 
`(Google Books API Call )` */

const BookDetail = () => {
  const { book } = useLoaderData() as LoaderData;
  const navigate = useNavigate();
  return (
    <div>
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
