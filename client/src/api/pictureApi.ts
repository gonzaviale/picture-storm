import { Picture } from '../types';
import axios from 'axios';

const PICTURES_URL = import.meta.env.VITE_PICTURES_API;

export const fetchPictures = async (): Promise<Picture[]> => {
  try {
    const response = await axios.get(`${PICTURES_URL}`);
    return response.data as Promise<Picture[]>;
  } catch (error) {
    console.error("Error fetching pictures:", error);
    throw new Error("Error fetching pictures");
  }
};
