import { Router } from 'express';
import EntryController from '../controllers/entries';

const router = Router();
const { createOne } = EntryController;

router.route('/')
  .post(createOne);

export default router;
