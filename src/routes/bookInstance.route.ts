import express from 'express';
import * as bookInstanceController from '../controllers/bookInstance.controller';
import { checkValidId } from '../middlewares';

const router = express.Router();

router.get('/create', bookInstanceController.bookInstanceCreateGet);

router.post('/create', bookInstanceController.bookInstanceCreatePost);

router.get('/:id/update', bookInstanceController.bookInstanceUpdateGet);

router.post('/:id/update', bookInstanceController.bookInstanceUpdatePost);

router.get('/:id/delete', bookInstanceController.bookInstanceDeleteGet);

router.post('/:id/delete', bookInstanceController.bookInstanceDeletePost);

router.get('/:id', bookInstanceController.bookInstanceDetail);

router.get('/:id', checkValidId, bookInstanceController.bookInstanceDetail);

router.get('/', bookInstanceController.bookInstanceList);

export default router;
