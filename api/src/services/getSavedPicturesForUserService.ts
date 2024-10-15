import User from '../models/User';
import Picture from '../models/Picture';
import { PictureResponse } from '../types';

export default async function getSavedPicturesForUserService(username: string, offset: number, limit: number): Promise<PictureResponse> {
  const user = await User.findOne({ username });

  if (!user || !user.savedPictures) {
    return { savedPictures: [], totalCount: 0 };
  }

  const totalCount = user.savedPictures.length;
  const paginatedPictureIds = user.savedPictures.slice(offset, offset + limit);  
  const savedPictures = await Picture.find({ _id: { $in: paginatedPictureIds } });

  return { savedPictures, totalCount };
}
