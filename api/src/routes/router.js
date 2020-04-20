import { Router } from 'express';
import userRoutes from './users';
import entryRoutes from './entries';
import UserMiddleware from '../middleware/users';

const router = Router();
const { authUser } = UserMiddleware;

userRoutes(router);
router.use(authUser);
entryRoutes(router);

export default (app) => app.use('/api/v1', router);
