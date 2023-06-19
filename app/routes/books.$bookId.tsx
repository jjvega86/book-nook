import { useLoaderData, useNavigate, Outlet } from "@remix-run/react";
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
    <div className="flex flex-col items-center mt-8 pb-16">
      <div className="max-w-[800px] p-4 shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold">{book?.volumeInfo.title}</h1>
          <h2 className="text-lg">{book?.volumeInfo.authors[0]}</h2>
          <p className="mt-2">{removeHtmlTags(book?.volumeInfo.description)}</p>
        </div>
        <div className="flex justify-center mt-4">
          <img
            className="h-48 object-cover max-w-[128px]"
            src={book?.volumeInfo.imageLinks.thumbnail}
            alt={book?.volumeInfo.title}
          />
        </div>
        <Outlet />
      </div>
      <div className="w-1/5 mt-8">
        <button
          onClick={() => navigate(-1)}
          className="w-full bg-gray-300 rounded p-2 hover:bg-gray-200 cursor-pointer"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default BookDetail;
