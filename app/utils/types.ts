export type User = {
  token: string;
  userId: string;
};

export type BookCardProps = {
  title: string;
  authors: string[];
  imageUrl: string;
};

export type Book = {
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      thumbnail: string;
    };
  };
  id: string;
};
