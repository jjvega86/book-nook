export const login = async (credentials: any) => {
  try {
    let response = await fetch("http://localhost:5500/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    let data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const register = async (credentials: any) => {
  try {
    let response = await fetch("http://localhost:5500/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    let data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
