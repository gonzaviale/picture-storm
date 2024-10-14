import axios from 'axios';

const apiKey = process.env.UNSPLASH_API_KEY;
const apiUrl = process.env.UNSPLASH_API;

export const searchPictures = async (query: string) => {
  const { data } = await axios.get(`${apiUrl}/search/photos?page=1&per_page=30&query=${query}&client_id=${apiKey}`);
  if (data.results.length > 0) {
    return processPictures(data.results);
  }
  return data.results;
};

const processPictures = (picturesArray: any[]) => {
  return picturesArray.map(picture => ({
    id: picture.id,
    description: picture.description || `Imagen de ${picture.user.name}`,
    altDescription: picture.alt_description,
    image: picture.urls.raw,
    color: picture.color,
    likes: picture.likes,
    createdBy: picture.user.name,
  }));
};

export const getExternalPicture = async (id: string) => {
  const { data } = await axios.get(`${apiUrl}/photos/${id}?client_id=${apiKey}`);
  return data;
};

