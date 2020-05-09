import { Router } from 'express';
import UserController from '../controllers/users';

const router = Router();
const { signup, signin } = UserController;

router.post('/auth/signup', signup);

router.post('/auth/signin', signin);

export default router;
