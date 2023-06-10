import React from "react";
import { Form } from "@remix-run/react";

const NavBar = () => {
  return (
    <nav>
      <p>BOOK NOOK</p>
      <Form action="/logout" method="post">
        <button type="submit">LOGOUT</button>
      </Form>
    </nav>
  );
};

export default NavBar;
