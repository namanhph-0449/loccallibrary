import express from 'express';
import * as bookController from '../controllers/book.controller';

const router = express.Router();

router.post('/create', bookController.bookCreate);

router.post('/:id/delete', bookController.bookDelete);

router.put('/:id/update', bookController.bookUpdate);

router.get('/:id', bookController.bookDetail);

router.get('/', bookController.bookList);

export default router;
