import { Request, Response } from 'express';
import Picture from '../../models/Picture';

export const deletePicture = async (req: Request, res: Response) => {
  try {

    const picture = await Picture.findById(req.params.id);
    if (!picture) {
      return res.status(404).json({ message: 'Imagen no encontrada' });
    }

    await Picture.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Imagen eliminada exitosamente', picture });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
