import { Request, Response } from 'express';
import Picture from '../../models/Picture';
import { verifyToken } from '../../utils/verifyToken';
import { getExternalPicture } from '../../services/unsplashService';

export const createPicture = async (req: Request, res: Response) => {
    const { description, altDescription, color, likes, createdAt, image } = req.body;
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        const { username } = verifyToken(token as string);

        const newPicture = new Picture({
            description,
            altDescription,
            color,
            image,
            likes,
            createdBy: username,
            createdAt,
        });

        await newPicture.save();

        return res.status(201).json(newPicture);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: (error as Error).message });
    }
};

export const addPictureExternal = async (req: Request, res: Response) => {
    const pictureData = await getExternalPicture(req.body.id);
    try {
        const newPicture = new Picture({
            description: pictureData.description || `Imagen de ${pictureData.user.name}`,
            altDescription: pictureData.alt_description || `Imagen de ${pictureData.user.name}`,
            color: pictureData.color,
            image: pictureData.urls.raw,
            likes: pictureData.likes,
            createdBy: pictureData.user.name,
            createdAt: pictureData.created_at,
        });

        await newPicture.save();

        res.status(201).json(newPicture);
    } catch (err) {
        res.status(500).json({ message: (err as Error).message });
    }

};