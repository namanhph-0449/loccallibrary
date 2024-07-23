import express from 'express';
import authorRouter from './author.route';
import bookRouter from './book.route';
import genreRouter from './genre.route';
import bookInstanceRouter from './bookInstance.route';

const router = express.Router();

/* GET home page. */
router.get('/', (req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.render('index', { title: 'Express' });
});

router.use('/authors', authorRouter);
router.use('/books', bookRouter);
router.use('/genres', genreRouter);
router.use('/book-instances', bookInstanceRouter);

export default router;
