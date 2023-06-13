import { LoaderArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import NavBar from "~/components/NavBar";
import authenticator from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  let user = await authenticator.isAuthenticated(request);

  return json({ user });
};

const BooksLayout = () => {
  const { user } = useLoaderData();
  return (
    <div>
      <header>
        <NavBar user={user} />
      </header>
      <main className="mx-20">
        <Outlet />
      </main>
    </div>
  );
};

export default BooksLayout;
