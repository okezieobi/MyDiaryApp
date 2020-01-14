import userController from '../controllers/users';
import router from './router';
import userMiddleware from '../middlewares/users';

router.post('/auth/signup', userMiddleware.signup(), userController.sendAuthResponse);

router.post('/auth/signin', userMiddleware.signin(), userController.sendAuthResponse);

export default router;
