import { Authenticator } from "remix-auth";
import { sessionStorage } from "./sessions.server";
import { FormStrategy } from "remix-auth-form";
import { User } from "~/utils/types";
import { decode } from "~/utils/helpers";
import { login } from "~/models/user.server";

const authenticator = new Authenticator<User | Error | null>(sessionStorage);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    let email = form.get("email");
    let password = form.get("password");
    let data = await login({ email, password });
    let token: string = data.token;
    let decoded: any = decode(token);
    let user: User = { token, userId: decoded.userId };

    return user;
  })
);

export default authenticator;
