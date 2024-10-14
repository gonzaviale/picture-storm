import { Request, Response } from 'express';
import Picture from '../../models/Picture';

export const updatePicture = async (req: Request, res: Response) => {
  try {
    const updatedPicture = await Picture.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPicture) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    res.status(200).json(updatedPicture);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
