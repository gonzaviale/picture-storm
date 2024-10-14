import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/verifyToken';
import User from '../models/User';

export const validateTokenHeader = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        const { username } = verifyToken(token!);
        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        
        next();
    } catch (error) {
        console.log((error as Error).message);
        return res.status(400).json({ message: (error as Error).message });
    }
}