import axios from 'axios';
import { Picture, User } from '../types';

const userRegisterURL = import.meta.env.VITE_USERS_REGISTER;
const userPicturesURL = import.meta.env.VITE_USERS_API_PICTURES;
const userLoginURL = import.meta.env.VITE_USERS_LOGIN;
const userSavePictureURL = import.meta.env.VITE_USERS_SAVE_PICTURE;

export const registerUser = async (user: User): Promise<void> => {
  try {
    await axios.post(`${userRegisterURL}`, user);
  } catch (error) {
    console.error("Error register user:", error);
    throw new Error("Error register user");
  }
}

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

export const fetchUserPictures = async (): Promise<Picture[]> => {
  try {
    const response = await axios.get(`${userPicturesURL}`);
    return response.data as Promise<Picture[]>;
  } catch (error) {
    console.error("Error fetching user pictures:", error);
    throw new Error("Error fetching user pictures");
  }
}

export const addPictureToSaved = async (pictureId: string): Promise<void> => {
  try {
    await axios.post(`${userSavePictureURL}`, { pictureId });
  } catch (error) {
    console.error("Error adding picture to saved:", error);
    throw new Error("Error adding picture to saved");
  }
}