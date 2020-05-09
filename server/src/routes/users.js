import { Router } from 'express';
import UserController from '../controllers/users';

const router = Router();
const { signup, signin } = UserController;

router.post('/signup', signup);
router.post('/signin', signin);

export default router;
