import { V2_MetaFunction, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import authenticator from "~/services/auth.server";

import NavBar from "~/components/NavBar";
import { getBooks } from "~/services/books.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Book Nook" },
    { name: "description", content: "The destination for all things book." },
  ];
};

// TODO: Move types + helpers to utils files once built
type Book = {
  volumeInfo: {
    title: string;
  };
  id: string;
};

function computeStartIndex(currentPage: string, maxResults: number) {
  let startIndex = Number(currentPage) * maxResults - maxResults;
  return startIndex;
}

export const loader = async ({ request }: LoaderArgs) => {
  let user = await authenticator.isAuthenticated(request);
  const url = new URL(request.url);
  const currentPage = url.searchParams.get("page") || "1";

  let maxResults = 40;
  let startIndex = computeStartIndex(currentPage, maxResults);

  let { items } = await getBooks("harry potter", startIndex, maxResults);

  return json({ user, books: items, currentPage });
};

const Books = () => {
  const { user, books, currentPage } = useLoaderData();
  // TODO: Add pagination animation on transition
  // TODO: search for books (use the "useSubmit" hook to submit on user input, see Remix docs)
  // TODO: Calculate last page based on total items + maxResults, disable next page on last
  const pagination = {
    previous: currentPage === "1" ? "1" : String(Number(currentPage) - 1),
    next: String(Number(currentPage) + 1),
  };

  return (
    <div>
      <header>
        <NavBar user={user} />
      </header>
      <main>
        <p className="mb-10 text-red-600">Current Page: {currentPage}</p>
        <div className="mb-10">
          {books &&
            books.map((book: Book) => (
              <p key={book.id}>{book.volumeInfo?.title}</p>
            ))}
        </div>
        <div className="flex flex-row gap-4">
          {currentPage === "1" ? (
            <p>Previous Page</p>
          ) : (
            <Link prefetch="intent" to={`?page=${pagination.previous}`}>
              Previous Page
            </Link>
          )}
          <Link prefetch="intent" to={`?page=${pagination.next}`}>
            Next Page
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Books;
