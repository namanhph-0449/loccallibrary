import express from 'express';
import * as bookInstanceController from '../controllers/bookInstance.controller';

const router = express.Router();

router.post('/create', bookInstanceController.bookInstanceCreate);

router.post('/:id/delete', bookInstanceController.bookInstanceDelete);

router.post('/:id/update', bookInstanceController.bookInstanceUpdate);

router.get('/:id', bookInstanceController.bookInstanceDetail);

router.get('/', bookInstanceController.bookInstanceList);

export default router;
