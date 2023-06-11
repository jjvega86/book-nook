// TODO: Add functions for Google Books requests

export const getBooks = async (
  searchTerm: string,
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
