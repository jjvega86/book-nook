import {
  redirect,
  type ActionArgs,
  type LoaderArgs,
  json,
} from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import authenticator from "~/services/auth.server";
import { register } from "~/models/user.server";

export const loader = async ({ request }: LoaderArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/books",
  });
};

export const action = async ({ request }: ActionArgs) => {
  /*
    - validate form data
    - send register request
    - ON SUCCESS -> redirect to login
    - ON FAILURE -> redirect to this page
    */
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");

  // TODO: validate form data

  const data = await register({ email, password });

  if (!data.message) {
    return redirect("/login");
  }

  return json(
    {
      errors: {
        email: "A user already exists with this email",
        password: null,
      },
    },
    { status: 400 }
  );
};

const Join = () => {
  const actionData = useActionData();
  // TODO: Finish out form with errors, focus management, and styling

  return (
    <Form method="post">
      <input type="email" name="email" required />
      {actionData?.errors?.email ? (
        <div className="pt-1 text-red-700" id="email-error">
          {actionData.errors.email}
        </div>
      ) : null}
      <input
        type="password"
        name="password"
        autoComplete="current-password"
        required
      />
      <button>Register</button>
    </Form>
  );
};

export default Join;
