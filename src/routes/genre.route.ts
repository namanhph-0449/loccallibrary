import express from 'express';
import * as genreController from '../controllers/genre.controller';

const router = express.Router();

router.post('/create', genreController.genreCreate);

router.post('/:id/delete', genreController.genreDelete);

router.put('/:id/update', genreController.genreUpdate);

router.get('/:id', genreController.genreDetail);

router.get('/', genreController.genreList);

export default router;
