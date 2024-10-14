import { Schema, model } from 'mongoose';

const PicturesSchema = new Schema({
  description: { type: String, required: true },
  altDescription: { type: String, required: true },
  color: { type: String, required: true },
  image: { type: String, required: true },
  likes: { type: Number },
  createdBy: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default model('Picture', PicturesSchema);