import Picture from "../models/Picture";
import User from "../models/User";

export default async function getSavedPicturesForUserService(username: string) {
    const user = await User.findOne({ username });
    if (!user) return [];
    const savedPictures = await Picture.find({ _id: { $in: user.savedPictures } });
    if (savedPictures) return savedPictures || [];
}