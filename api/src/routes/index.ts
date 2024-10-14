import { Router } from 'express';

import { registerUser } from '../controllers/userController/userRegisterController';
import { loginUser } from '../controllers/userController/userLoginController';
import { savePicture } from '../controllers/userController/userSavePictureController';
import { getPicturesByUser, getPicturesByUserSaved } from '../controllers/userController/userGetController';
import { removeSavedPicture } from '../controllers/userController/userDeleteController';

import { addPictureExternal, createPicture } from '../controllers/pictureController/pictureCreateController';
import { getPictures, getPictureById, searchPicturesByQuery } from '../controllers/pictureController/pictureGetController';
import { deletePicture } from '../controllers/pictureController/pictureDeleteController';
import { updatePicture } from '../controllers/pictureController/pictureUpdateController';

import { validateTokenHeader } from '../middleware/validateTokenHeader';
import { validateCreatePicture } from '../middleware/validateCreatePicture';

const router = Router();

router.post('/users/register', registerUser);

router.post('/users/login', loginUser);

router.post('/users/save', validateTokenHeader, savePicture);

router.get('/users/my-pictures', validateTokenHeader, getPicturesByUser);

router.get('/users/my-save-pictures', validateTokenHeader, getPicturesByUserSaved);

router.delete('/users/delete-saved-picture', validateTokenHeader, removeSavedPicture);

router.post('/pictures/', validateTokenHeader, validateCreatePicture, createPicture);

router.post('/pictures/external', validateTokenHeader, addPictureExternal);

router.put('/pictures/:id', validateTokenHeader, updatePicture);

router.delete('/pictures/:id', validateTokenHeader, deletePicture);

router.get('/pictures/', getPictures);

router.get('/pictures/:id', getPictureById);

router.get('/pictures/unsplash-service/search', validateTokenHeader, searchPicturesByQuery);

export default router;