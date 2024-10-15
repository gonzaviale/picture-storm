import { Picture } from '../types';
import axios from 'axios';

const PICTURES_URL = import.meta.env.VITE_PICTURES_API;
const PICTURES_URL_EXTERNAL = import.meta.env.VITE_PICTURES_API_SEARCH_EXTERNAL;
const PICTURES_URL_EXTERNAL_ADD = import.meta.env.VITE_PICTURES_API_ADD_EXTERNAL;

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

export const updatePicture = async (id: string, picture: Picture): Promise<Picture> => {
  try {
    const response = await axios.put(`${PICTURES_URL}/${id}`, { ...picture });
    return response.data as Promise<Picture>;
  } catch (error) {
    console.error("Error updating picture:", error);
    throw new Error("Error updating picture");
  }
};

export const fetchPictureiD = async (id: string): Promise<Picture> => {
  try {
    const response = await axios.get(`${PICTURES_URL}/${id}`);
    return response.data as Promise<Picture>;
  } catch (error) {
    console.error("Error fetching picture:", error);
    throw new Error("Error fetching picture");
  }
};

export const searchExternalPictures = async (query: string): Promise<Picture[]> => {
  try {
    const response = await axios.get(`${PICTURES_URL_EXTERNAL}?query=${query}`);
    return response.data as Promise<Picture[]>;
  } catch (error) {
    console.error("Error searching external pictures:", error);
    throw new Error("Error searching external pictures");
  }
}

export const addPictureExternal = async (id: string): Promise<Picture> => {
  try {
    const response = await axios.post(`${PICTURES_URL_EXTERNAL_ADD}`, { id: String(id), });
    return response.data as Promise<Picture>;
  } catch (error) {
    console.error("Error adding picture from external API:", error);
    throw new Error("Error adding picture from external API");
  }
}
