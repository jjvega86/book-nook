// TODO: Move type to utils/types.ts

type BookCardProps = {
  title: string;
  authors: string[];
  imageUrl: string;
};

const BookCard = ({ title, authors, imageUrl }: BookCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-sm">
      <img className="h-48 w-full object-cover" src={imageUrl} alt={title} />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">
          Author(s):{" "}
          {authors ? (
            authors?.map((author) => <p>{author}</p>)
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
