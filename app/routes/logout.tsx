import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import authenticator from "~/services/auth.server";

export const action = async ({ request }: ActionArgs) =>
  await authenticator.logout(request, { redirectTo: "/" });

export const loader = async () => redirect("/");
