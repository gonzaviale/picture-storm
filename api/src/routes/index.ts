import { Router } from 'express';

import { registerUser } from '../controllers/userController/userRegisterController';
import { loginUser } from '../controllers/userController/userLoginController';

import { getPictures, getPictureById, searchPicturesByQuery } from '../controllers/pictureController/pictureGetController';

import { validateTokenHeader } from '../middleware/validateTokenHeader';

const router = Router();

router.post('/users/register', registerUser);

router.post('/users/login', loginUser);

router.get('/pictures/', getPictures)

router.get('/pictures/:id', getPictureById);

router.get('/pictures/unsplash-service/search', validateTokenHeader, searchPicturesByQuery);

export default router;