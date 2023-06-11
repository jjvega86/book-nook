import { V2_MetaFunction, json } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import authenticator from "~/services/auth.server";

import NavBar from "~/components/NavBar";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Book Nook" },
    { name: "description", content: "The destination for all things book." },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  let user = await authenticator.isAuthenticated(request);

  return json(user);
};

const Books = () => {
  const user = useLoaderData();
  // TODO: search for books (use the "useSubmit" hook to submit on user input, see Remix docs)
  return (
    <div>
      <header>
        <NavBar user={user} />
      </header>
      <main>
        <h1>Welcome to Book Nook</h1>
        {user ? (
          <pre>userId: {user.userId}</pre>
        ) : (
          <Link to="/login">Login Here</Link>
        )}
      </main>
    </div>
  );
};

export default Books;
