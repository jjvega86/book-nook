// TODO: Add functions for Google Books requests

export const getBooks = async (searchTerm: string) => {
  try {
    let response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}`
    );

    let data = await response.json();
    return data.items;
  } catch (error) {
    console.error(error);
  }
};
