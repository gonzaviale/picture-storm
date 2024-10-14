import jwt from 'jsonwebtoken';

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { username: string };
    
    return decoded;
  } catch (error) {
    throw new Error('Token inválido');
  }
};