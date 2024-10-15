import { Request, Response } from 'express';
import { verifyToken } from '../../utils/verifyToken';
import getSavedPicturesForUserService from '../../services/getSavedPicturesForUserService';
import Picture from '../../models/Picture';
import { PaginateResponse } from '../../types';

export const getPicturesByUserSaved = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const { username } = verifyToken(token!);

      const page = parseInt(req.query.page as string) || 1;

      const savedPictures = await getSavedPicturesForUserService(page, username);

      res.status(200).json(savedPictures);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching saved pictures' });
    }
  };

  export const getPicturesByUser = async (req: Request, res: Response) => {
    try {
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      const { username } = verifyToken(token!);

      const page = parseInt(req.query.page as string) || 1;
      const startIndex = (page - 1) * 3;
      const endIndex = page * 3;
      
      const pictures = await Picture.find({ createdBy: username });

      const userPictures = pictures.slice(startIndex, endIndex);

      const results : PaginateResponse = {
        pictures: userPictures,
        totalCount: pictures.length,
        currentPage: page,
        totalPages: Math.ceil(pictures.length / 3),
      };

      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user pictures' });
    }
  };