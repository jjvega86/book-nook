import { LoaderFunction, Outlet, json, useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import authenticator from "~/services/auth.server";
import { getBookInfo } from "~/services/books.server";

type LoaderData = {
  info: Awaited<ReturnType<typeof getBookInfo>>;
};

type Review = {
  text: string;
  user: {
    email: string;
  };
};

export const loader: LoaderFunction = async ({ request, params }) => {
  let user = await authenticator.isAuthenticated(request);
  let info = null;

  if (user && !(user instanceof Error)) {
    info = await getBookInfo(params.bookId, user.token);
  }

  return json<LoaderData>({ info });
};

export const Reviews = () => {
  const { info } = useLoaderData() as LoaderData;
  const { reviews, favorited, averageRating } = info;
  return (
    <div>
      <hr className="my-6" />
      <div className="flex flex-row w-full justify-between">
        <h3 className="font-bold text-lg mb-6">Reviews</h3>
        <Link to="new">
          <button>Add Review</button>
        </Link>
      </div>
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review: Review) => (
            <li>
              {review.text} : {review.user.email}
            </li>
          ))
        ) : (
          <p>No Reviews!</p>
        )}
      </ul>
      <Outlet />
    </div>
  );
};

export default Reviews;
