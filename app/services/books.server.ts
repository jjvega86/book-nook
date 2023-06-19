import type { Book } from "~/utils/types";

export const getBookDetail = async (
  bookId: string | undefined
): Promise<Book | undefined> => {
  try {
    const data = await fetch(
      `https://www.googleapis.com/books/v1/volumes/${bookId}`
    );
    return await data.json();
  } catch (error) {
    console.error(error);
  }
};

export const getBooks = async (
  searchTerm: string | null = "harry potter",
  startIndex: Number,
  maxResults: Number
) => {
  try {
    let response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=${startIndex}&maxResults=${maxResults}`
    );

    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getBookInfo = async (
  bookId: string | undefined,
  token: string | undefined
) => {
  try {
    let response = await fetch(`http://localhost:5500/api/books/${bookId}/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    let data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
