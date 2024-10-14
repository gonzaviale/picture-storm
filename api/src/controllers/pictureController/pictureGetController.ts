import { Request, Response } from 'express';
import { searchPictures } from '../../services/unsplashService';
import Picture from '../../models/Picture';

export const searchPicturesByQuery = async (req: Request, res: Response) => {
  try {
    const results = await searchPictures(req.query.query as string);
    
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error searching pictures' });
  }
};

export const getPictures = async (req: Request, res: Response) => {
  try {
    const results = await Picture.find();

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching all pictures' });
  }
};

export const getPictureById = async (req: Request, res: Response) => {
  try {
    const picture = await Picture.findById(req.params.id);

    if (!picture) {
      return res.status(404).json({ message: 'Picture not found' });
    }

    res.status(200).json(picture);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching picture' });
  }
};
