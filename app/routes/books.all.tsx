import { V2_MetaFunction, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";

import authenticator from "~/services/auth.server";
import { getBooks } from "~/services/books.server";
import { computeStartIndex, validateQuery } from "~/utils/helpers";

import { AnimatePresence, motion } from "framer-motion";
import NavBar from "~/components/NavBar";
import BookGrid from "~/components/BookGrid";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Book Nook" },
    { name: "description", content: "The destination for all things book." },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  let user = await authenticator.isAuthenticated(request);
  const url = new URL(request.url);
  const currentPage = url.searchParams.get("page") || "1";

  const search = new URLSearchParams(url.search);
  const query = search.get("query");
  const validatedQuery = validateQuery(query);

  let maxResults = 40;
  let startIndex = computeStartIndex(currentPage, maxResults);

  let { items } = await getBooks(validatedQuery, startIndex, maxResults);

  return json({ user, books: items, currentPage, query });
};

const Books = () => {
  const { user, books, currentPage, query } = useLoaderData();
  // TODO: Refactor to all reusable components

  const pagination = {
    previous: currentPage === "1" ? "1" : String(Number(currentPage) - 1),
    next: String(Number(currentPage) + 1),
    currentPage,
  };

  return (
    <div>
      <header>
        <NavBar user={user} />
      </header>
      <main className="mx-20">
        <div className="my-5">
          <Form>
            <input
              className="h-10"
              type="text"
              name="query"
              placeholder="Search for Books"
            />
          </Form>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            className="my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center"
            key={currentPage}
            initial={{ x: "-10%", opacity: 0 }}
            animate={{ x: "0", opacity: 1 }}
            exit={{ y: "-10%", opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BookGrid books={books} />
          </motion.div>
        </AnimatePresence>
        <div className="flex flex-row gap-4 justify-center mb-5">
          {currentPage === "1" ? (
            <p>Previous Page</p>
          ) : (
            <Link
              className="hover:text-blue-600"
              prefetch="intent"
              to={`?page=${pagination.previous}&query=${query}`}
            >
              Previous Page
            </Link>
          )}
          <Link
            className="hover:text-blue-600"
            prefetch="intent"
            to={`?page=${pagination.next}&query=${query}`}
          >
            Next Page
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Books;
