import { Request, Response } from 'express';
import User from '../../models/User';
import jwt from 'jsonwebtoken';
import { verifyPassword } from '../../utils/cryptoUtils';

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isMatch = verifyPassword(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    res.setHeader('Authorization', `Bearer ${token}`);

    res.status(200).json({
      message: "Usuario autenticado exitosamente",
      token,
      username: user.username,
    });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
