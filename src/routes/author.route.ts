import express from 'express';
import * as authorController from '../controllers/author.controller';
import { checkValidId } from '../middlewares';

const router = express.Router();

router.get('/create', authorController.authorCreateGet);

router.post('/create', authorController.authorCreatePost);

router.get('/:id/update', authorController.authorUpdateGet);

router.post('/:id/update',authorController.authorUpdatePost);

router.get('/:id/delete', authorController.authorDeleteGet);

router.post('/:id/delete', authorController.authorDeletePost);

router.get('/:id', authorController.authorDetail);

router.get('/:id', checkValidId, authorController.authorDetail);

router.get('/', authorController.authorList);

export default router;
