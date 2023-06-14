import type { BookCardProps } from "~/utils/types";

const BookCard = ({ title, authors, imageUrl }: BookCardProps) => {
  return (
    <div className="bg-white rounded-lg flex shadow-md overflow-hidden max-w-sm">
      <img
        className="h-48 object-cover max-w-[128px]"
        src={imageUrl}
        alt={title}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">
          {title.length > 29 ? `${title.slice(0, 28)}...` : title}
        </h2>
        <p className="text-gray-700 mb-4">
          Author:{" "}
          {authors ? (
            authors?.map((author) => <p key={author}>{author}</p>).slice(0, 1)
          ) : (
            <p>No Author Listed!</p>
          )}
        </p>
        {/* Additional content or actions can be added here */}
      </div>
    </div>
  );
};

export default BookCard;
