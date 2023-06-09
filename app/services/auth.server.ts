import { Authenticator } from "remix-auth";
import { sessionStorage } from "./sessions.server";
import { FormStrategy } from "remix-auth-form";
import jwtDecode from "jwt-decode";
import { login } from "~/models/user.server";

type User = {
  token: string;
  userId: string;
};

function decode(token: string) {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error(error);
  }
}

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
