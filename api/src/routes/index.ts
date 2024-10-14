import { Router } from 'express';

import { registerUser } from '../controllers/userController/userCreateController';

const router = Router();

router.post('/users/register', registerUser);

export default router;