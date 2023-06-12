import { Link } from "@remix-run/react";
import { useMemo } from "react";

type PaginationControlsProps = {
  currentPage: string;
  query: string;
};

const PaginationControls = ({
  currentPage,
  query,
}: PaginationControlsProps) => {
  const pagination = useMemo(() => {
    let paginationObject = {
      previous: currentPage === "1" ? "1" : String(Number(currentPage) - 1),
      next: String(Number(currentPage) + 1),
    };

    return paginationObject;
  }, [currentPage]);

  return (
    <div className="flex flex-row gap-4 justify-center mb-5">
      {currentPage === "1" ? (
        <p>Previous Page</p>
      ) : (
        <Link
          className="hover:text-blue-600"
          prefetch="intent"
          to={`?page=${pagination.previous}&query=${query}`}
        >
          Previous Page
        </Link>
      )}
      <Link
        className="hover:text-blue-600"
        prefetch="intent"
        to={`?page=${pagination.next}&query=${query}`}
      >
        Next Page
      </Link>
    </div>
  );
};

export default PaginationControls;
