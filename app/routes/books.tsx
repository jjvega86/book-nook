import { V2_MetaFunction, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import authenticator from "~/services/auth.server";

import NavBar from "~/components/NavBar";
import { getBooks } from "~/services/books.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Book Nook" },
    { name: "description", content: "The destination for all things book." },
  ];
};

type Book = {
  volumeInfo: {
    title: string;
  };
};

export const loader = async ({ request }: LoaderArgs) => {
  let user = await authenticator.isAuthenticated(request);

  let books = await getBooks("harry potter");
  let prunedBooks = books.slice(0, 10);

  return json({ user, books: prunedBooks });
};

const Books = () => {
  const { user, books } = useLoaderData();
  // TODO: Fetch default book search and render
  // TODO: search for books (use the "useSubmit" hook to submit on user input, see Remix docs)
  // TODO: Add pagination for all book results (start pruned)
  return (
    <div>
      <header>
        <NavBar user={user} />
      </header>
      <main>
        {books &&
          books.map((book: Book) => (
            <p key={book.volumeInfo.title}>{book.volumeInfo?.title}</p>
          ))}
      </main>
    </div>
  );
};

export default Books;
