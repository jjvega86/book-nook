import React from "react";
import { Link } from "react-router-dom";

const BooksIndex = () => {
  return (
    <div className="grid place-content-center mt-8">
      <h1 className="text-3xl font-bold">Let your book journey begin!</h1>
      <Link to="./all">Go to book search...</Link>
    </div>
  );
};

export default BooksIndex;
