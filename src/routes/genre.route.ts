import express from 'express';
import * as genreController from '../controllers/genre.controller';
import { checkValidId } from '../middlewares';
import { body } from 'express-validator';

const router = express.Router();

router.get('/create', genreController.genreCreateGet);
router
  .post('/create',
    body('name', 'Genre name must contain at least 3 characters').trim().isLength({ min: 3 }).escape(),
    genreController.genreCreatePost,
  );
router.get('/:id/update', genreController.genreUpdateGet);
router
  .post('/:id/update',
    body('name', 'Genre name must contain at least 3 characters').trim().isLength({ min: 3 }).escape(),
    genreController.genreUpdatePost,
  );

router.get('/:id/delete', genreController.genreDeleteGet);
router.post('/:id/delete', genreController.genreDeletePost);

router.get('/:id', checkValidId, genreController.genreDetail);

router.get('/', genreController.genreList);

export default router;
