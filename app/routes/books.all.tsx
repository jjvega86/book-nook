import { V2_MetaFunction, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";

import { getBooks } from "~/services/books.server";
import { computeStartIndex, validateQuery } from "~/utils/helpers";

import { AnimatePresence, motion } from "framer-motion";
import BookGrid from "~/components/BookGrid";
import PaginationControls from "~/components/PaginationControls";
import { useEffect, useRef } from "react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Book Nook" },
    { name: "description", content: "The destination for all things book." },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const currentPage = url.searchParams.get("page") || "1";

  const search = new URLSearchParams(url.search);
  const query = search.get("query");
  const validatedQuery = validateQuery(query);

  let maxResults = 40;
  let startIndex = computeStartIndex(currentPage, maxResults);

  let { items } = await getBooks(validatedQuery, startIndex, maxResults);

  return json({ books: items, currentPage, query });
};

const Books = () => {
  const { books, currentPage, query } = useLoaderData();
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  let formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    formRef.current?.reset();
  }, [loading]);

  return (
    <div>
      <div className="my-5">
        <Form ref={formRef}>
          <input
            className="h-10"
            type="text"
            name="query"
            placeholder={loading ? "Loading..." : "Search for books..."}
            disabled={loading}
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
    </div>
  );
};

export default Books;
