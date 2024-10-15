import axios from 'axios';
import { PaginateResponse, Picture, User } from '../types';

const userRegisterURL = import.meta.env.VITE_USERS_REGISTER;
const userPicturesURL = import.meta.env.VITE_USERS_API_PICTURES;
const userLoginURL = import.meta.env.VITE_USERS_LOGIN;
const userSavePictureURL = import.meta.env.VITE_USERS_SAVE_PICTURE;
const userDeleteSavedPictureURL = import.meta.env.VITE_USERS_DELETE_SAVE_PICTURE;
const userSavedPicturesURL = import.meta.env.VITE_USERS_API_PICTURES_SAVED;

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

export const fetchUserPictures = async (page: number): Promise<PaginateResponse> => {
  try {
    const response = await axios.get(`${userPicturesURL}?page=${page}`);
    return response.data as Promise<PaginateResponse>;
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

export const removeSavedPicture = async (pictureId: string): Promise<void> => {
  try {
    await axios.delete(`${userDeleteSavedPictureURL}`, { data: { pictureId } });
  } catch (error) {
    console.error("Error removing picture from saved:", error);
    throw new Error("Error removing picture from saved");
  }
}

export const fetchUserSavedPictures = async (): Promise<Picture[]> => {
  try {
    const response = await axios.get(`${userSavedPicturesURL}`);
    return response.data as Promise<Picture[]>;
  } catch (error) {
    console.error("Error fetching user saved pictures:", error);
    throw new Error("Error fetching user saved pictures");
  }
}
