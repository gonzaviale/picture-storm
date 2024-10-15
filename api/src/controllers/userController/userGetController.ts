import { Request, Response } from 'express';
import { verifyToken } from '../../utils/verifyToken';
import getSavedPicturesForUserService from '../../services/getSavedPicturesForUserService';
import Picture from '../../models/Picture';

export const getPicturesByUserSaved = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    const { username } = verifyToken(token!);

    const page = parseInt(req.query.page as string) || 1;
    const limit = 4;
    const offset = (page - 1) * limit;

    const { savedPictures, totalCount } = await getSavedPicturesForUserService(username, offset, limit);

    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
      pictures: savedPictures,
      totalCount,
      totalPages,
      currentPage: page,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching saved pictures'});
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