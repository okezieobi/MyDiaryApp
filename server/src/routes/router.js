import { Router } from 'express';
import userRoutes from './users';
import entryRoutes from './entries';
import UserMiddleware from '../middleware/users';

const router = Router();
const version = Router();
const { authUser } = UserMiddleware;

router.use('/auth', userRoutes);
router.use(authUser);
router.use('/entries', entryRoutes);

version.use('/v1', router);

export default router;
