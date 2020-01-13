import userController from '../controllers/users';
import router from './router';
import userMiddleware from '../middlewares/users';

router.post('/auth/signup', userMiddleware.signup(), userController.signup);

// router.post('/auth/signin', userMiddleware.signin(), userController.signIn.bind(userController));

export default router;
