// TODO: Add logout and registration functions
// TODO: Add navbar with conditional login/register/logout button
// TODO: Finish writing form with validations and error handling that redirects

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
