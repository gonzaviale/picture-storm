import { Schema, model } from 'mongoose';
import { PictureInterface } from '../types';

const PicturesSchema = new Schema<PictureInterface>({
  description: { type: String, required: true },
  altDescription: { type: String, required: true },
  color: { type: String, required: true },
  image: { type: String, required: true },
  likes: { type: Number },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model<PictureInterface>('Picture', PicturesSchema);