import { Request, Response } from 'express';
import User from '../../models/User';

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email, username });
    
    if (user) {
      return res.status(409).json({ message: "El usuario ya existe" });
    }

    const newUser = new User({ username, email, password });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado con éxito!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};