import { V2_MetaFunction, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";

import authenticator from "~/services/auth.server";
import { getBooks } from "~/services/books.server";
import { computeStartIndex, validateQuery } from "~/utils/helpers";

import { AnimatePresence, motion } from "framer-motion";
import NavBar from "~/components/NavBar";
import BookGrid from "~/components/BookGrid";
import PaginationControls from "~/components/PaginationControls";

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
        <PaginationControls currentPage={currentPage} query={query} />
      </main>
    </div>
  );
};

export default Books;
