import axios from 'axios';

const userLoginURL = import.meta.env.VITE_USERS_LOGIN;

export const loginUser = async (user: { email: string; password: string }): Promise<string> => {
  try {
    const response = await axios.post(`${userLoginURL}`, user);
    sessionStorage.setItem('token', response.data.token);
    sessionStorage.setItem('username', response.data.username);
    return response.data.token;
  } catch (error) {
    console.error("Error login user:", error);
    throw new Error("Error login user");
  }
}
