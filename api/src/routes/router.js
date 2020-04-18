import { Router } from 'express';
import userRoutes from './users';

const router = Router();

userRoutes(router);

export default (app) => app.use('/api/v1', router);
