import { Request, Response } from 'express';
import User from '../../models/User';
import { verifyToken } from '../../utils/verifyToken';


export const removeSavedPicture = async (req: Request, res: Response) => {
    try {
        const { pictureId } = req.body;

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const { username } = verifyToken(token!);

        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        if (!user.savedPictures.includes(pictureId)) {
            return res.status(404).json({ message: 'La imagen no está guardada' });
        }

        const newSavedPictures = user.savedPictures.filter((sPictureId) => sPictureId.toString() !== pictureId.toString());


        if (newSavedPictures.length === user.savedPictures.length) {
            return res.status(404).json({ message: 'La imagen no está en los favoritos' });
        }

        user.savedPictures = newSavedPictures;

        await user.save();

        res.status(200).json({ message: 'Imagen eliminada' });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};