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

export const createPicture = async (picture: Picture): Promise<Picture> => {
  try {
    const response = await axios.post(`${PICTURES_URL}`, { ...picture });
    return response.data as Promise<Picture>;
  } catch (error) {
    console.error("Error creating picture:", error);
    throw new Error("Error creating picture");
  }
}

export const deletePicture = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${PICTURES_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting picture:", error);
    throw new Error("Error deleting picture");
  }
};
