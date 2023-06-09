import { LoaderArgs, V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import authenticator from "~/services/auth.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Book Nook" },
    { name: "description", content: "The destination for all things book." },
  ];
};

export const loader = async ({ request }: LoaderArgs) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/books/all",
  });

  return null;
};

export default function Index() {
  // TODO: Finish styling
  return (
    <div>
      <main>
        <h1>Welcome to Book Nook</h1>
        <div className="flex flex-col gap-2 mt-2">
          <Link to="/join">Sign up to get started!</Link>
          <Link to="/login">
            Already signed up?{" "}
            <span className="text-blue-600">Login here.</span>
          </Link>
          <Link to="/books/all">Want to search now? Click here.</Link>
        </div>
      </main>
    </div>
  );
}
