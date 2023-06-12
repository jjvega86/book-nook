import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form } from "@remix-run/react";
import authenticator from "~/services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/books",
  });
};

export const action = async ({ request }: ActionArgs) => {
  // TODO: Validate form inputs

  return await authenticator.authenticate("form", request, {
    successRedirect: "/books/all",
    failureRedirect: "/login",
  });
};

const Login = () => {
  // TODO: Add error messages
  // TODO: Finish styling
  return (
    <Form method="post">
      <input type="email" name="email" required />
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button>Sign In</button>
    </Form>
  );
};

export default Login;
