import { Request, Response } from 'express';
import { verifyToken } from '../../utils/verifyToken';
import getSavedPicturesForUserService from '../../services/getSavedPicturesForUserService';
import Picture from '../../models/Picture';

export const getPicturesByUserSaved = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const { username } = verifyToken(token!);

      const results = await getSavedPicturesForUserService(username as string);

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching saved pictures' });
    }
  };

  export const getPicturesByUser = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const { username } = verifyToken(token!);
      
      const results = await Picture.find({ createdBy: username });

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user pictures' });
    }
  };