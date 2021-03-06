import UserController from '../controllers/users';
import router from './router';
import UserMiddleware from '../middleware/users';
import MiddlewareHelper from '../middleware/middleware';

const { addUser, verifyPassword } = UserController;
const { signup, signin } = UserMiddleware;
const { callBack } = MiddlewareHelper;

router.post('/auth/signup', signup(), callBack(addUser));

router.post('/auth/signin', signin(), callBack(verifyPassword));

export default router;
