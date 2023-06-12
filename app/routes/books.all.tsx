import { V2_MetaFunction, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import authenticator from "~/services/auth.server";
import { getBooks } from "~/services/books.server";

import { AnimatePresence, motion } from "framer-motion";
import BookCard from "~/components/BookCard";
import NavBar from "~/components/NavBar";

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
    authors: string[];
    imageLinks: {
      thumbnail: string;
    };
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
  // TODO: search for books (use the "useSubmit" hook to submit on user input, see Remix docs)
  const pagination = {
    previous: currentPage === "1" ? "1" : String(Number(currentPage) - 1),
    next: String(Number(currentPage) + 1),
  };

  return (
    <div>
      <header>
        <NavBar user={user} />
      </header>
      <main className="mx-20">
        <p className="mb-10 text-red-600">Current Page: {currentPage}</p>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-center"
            key={currentPage}
            initial={{ x: "-10%", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            exit={{ y: "-10%", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {books &&
              books.map((book: Book) => (
                <BookCard
                  key={book.id}
                  title={book.volumeInfo.title}
                  imageUrl={book.volumeInfo.imageLinks?.thumbnail}
                  authors={book.volumeInfo.authors}
                />
              ))}
          </motion.div>
        </AnimatePresence>
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
