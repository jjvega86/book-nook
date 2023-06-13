import { Link, useParams } from "@remix-run/react";

const BookDetail = () => {
  const { bookId } = useParams();
  return (
    <div>
      <p>Book Id: {bookId}</p>
      <Link to="/books/all">Back to books</Link>
    </div>
  );
};

export default BookDetail;
