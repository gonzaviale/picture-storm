import { Schema, model } from 'mongoose';
import { hashPassword } from '../utils/cryptoUtils';

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  savedPictures: [{ type: Schema.Types.ObjectId, ref: 'Picture' }]
});

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next();

  this.password = hashPassword(this.password);
  next();
});

export default model('User', UserSchema);