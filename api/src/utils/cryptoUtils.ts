import crypto from 'crypto-js';

export const hashPassword = (password: string) => {
  return crypto.SHA256(password).toString();
};

export const verifyPassword = (password: string, hash: string) => {
  return hash === crypto.SHA256(password).toString();
};