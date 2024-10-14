import { validateRequiredField } from "../utils/validateRequiredField";
import { Request, Response } from "express";

export const validateCreatePicture = (req: Request, res: Response, next: any) => {
    try {
        const { description, altDescription, color, image } = req.body;
        validateRequiredField("description", description);
        validateRequiredField("image", image);
        validateRequiredField("altDescription", altDescription);
        validateRequiredField("color", color);
        next();
    } catch (error) {
        return res.status(400).json({ message: (error as Error).message });
    }
}