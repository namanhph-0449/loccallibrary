import express from 'express';
import * as bookController from '../controllers/book.controller';
import { checkValidId } from '../middlewares';

const router = express.Router();

router.get('/create', bookController.bookCreateGet);

router.post('/create', bookController.bookCreatePost);

router.get('/:id/update', bookController.bookUpdateGet);

router.post('/:id/update', bookController.bookUpdatePost);

router.get('/:id/delete', bookController.bookDeleteGet);

router.post('/:id/delete', bookController.bookDeletePost);

router.get('/:id', bookController.bookDetail);

router.get('/:id', checkValidId, bookController.bookDetail);

router.get('/', bookController.bookList);

export default router;
