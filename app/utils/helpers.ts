import jwtDecode from "jwt-decode";

export const decode = (token: string) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error(error);
  }
};

export const computeStartIndex = (currentPage: string, maxResults: number) => {
  let startIndex = Number(currentPage) * maxResults - maxResults;
  return startIndex;
};

export const validateQuery = (query: string | null) => {
  return query == null ? "harry potter" : query === "" ? "star wars" : query;
};
