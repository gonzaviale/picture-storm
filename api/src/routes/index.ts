import { Router } from 'express';

import { registerUser } from '../controllers/userController/userRegisterController';
import { loginUser } from '../controllers/userController/userLoginController';
import { savePicture } from '../controllers/userController/userSavePictureController';
import { getPicturesByUser, getPicturesByUserSaved } from '../controllers/userController/userGetController';

import { createPicture } from '../controllers/pictureController/pictureCreateController';
import { getPictures, getPictureById, searchPicturesByQuery } from '../controllers/pictureController/pictureGetController';

import { validateTokenHeader } from '../middleware/validateTokenHeader';
import { validateCreatePicture } from '../middleware/validateCreatePicture';

const router = Router();

router.post('/users/register', registerUser);

router.post('/users/login', loginUser);

router.post('/users/save', validateTokenHeader, savePicture);

router.get('/users/my-pictures', validateTokenHeader, getPicturesByUser);

router.get('/users/my-save-pictures', validateTokenHeader, getPicturesByUserSaved);

router.post('/pictures/', validateTokenHeader, validateCreatePicture, createPicture);

router.get('/pictures/', getPictures)

router.get('/pictures/:id', getPictureById);

router.get('/pictures/unsplash-service/search', validateTokenHeader, searchPicturesByQuery);

export default router;