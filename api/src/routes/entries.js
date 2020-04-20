import EntryController from '../controllers/entries';

export default (router) => {
  const { createOne } = EntryController;

  router.route('/entries')
    .post(createOne);
};
