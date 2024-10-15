import Picture from "../models/Picture";
import User from "../models/User";
import { PaginateResponse } from "../types";

const getSavedPicturesForUser = async (page: number, username: string) : Promise<PaginateResponse> => {
    const startIndex = (page - 1) * 3;
    const endIndex = page * 3;

    const user = await User.findOne({ username });

    if(!user) {
        throw new Error("User not found");
    }

    const savedPictures = user.savedPictures.slice(startIndex, endIndex);

    const pictures = await Picture.find({ _id: { $in: savedPictures } });

    return {
        pictures: pictures,
        totalCount: user.savedPictures.length,
        currentPage: page,
        totalPages: Math.ceil(user.savedPictures.length / 3)
    };
}

export default getSavedPicturesForUser;