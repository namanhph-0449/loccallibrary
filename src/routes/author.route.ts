import express from 'express';
import * as authorController from '../controllers/author.controller';
import { checkValidId } from '../middlewares';

const router = express.Router();

router.post('/create', authorController.authorCreate);

router.post('/:id/delete', authorController.authorDelete);

router.put('/:id/update', authorController.authorUpdate);

router.get('/:id', checkValidId, authorController.authorDetail);

router.get('/', authorController.authorList);

export default router;
