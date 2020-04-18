import UserController from '../controllers/users';

const { signup, signin } = UserController;

export default (router) => {
  router.post('/auth/signup', signup);
  router.post('/auth/signup', signin);
};
