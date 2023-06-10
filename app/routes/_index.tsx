import { V2_MetaFunction, json, redirect } from "@remix-run/node";
import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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

  if (!user) {
    return redirect("/login");
  }
  return json(user);
};

export default function Index() {
  const user = useLoaderData();
  return (
    <div>
      <header>
        <NavBar />
      </header>
      <main>
        <h1>Welcome to Remix</h1>
        <pre>userId: {user?.userId}</pre>
      </main>
    </div>
  );
}
