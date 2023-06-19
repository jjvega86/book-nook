import { Outlet } from "react-router";
import { Link } from "react-router-dom";

export const Reviews = () => {
  return (
    <div>
      <hr className="my-6" />
      <div className="flex flex-row w-full justify-between">
        <h3 className="font-bold text-lg mb-6">Reviews</h3>
        <Link to="new">
          <button>Add Review</button>
        </Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Reviews;
