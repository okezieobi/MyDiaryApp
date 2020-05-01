import UserController from '../controllers/users';

export default (router) => {
  const { signup, signin } = UserController;

  router.post('/auth/signup', signup);

  router.post('/auth/signin', signin);
};
