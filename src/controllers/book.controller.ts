import * as bookService from '../services/book.service'
import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import { t } from 'i18next';
import { Book } from '../entity/book.entity';
import { body, Result, validationResult } from 'express-validator';
import * as bookMiddleware from '../middlewares/book.middleware';
import { ActionForm } from '../constant';
import { checkValidId } from '../middlewares';

interface IBookRequest extends Request {
    book?: Book | null;
}

export const index = asyncHandler(async (req: Request, res: Response) => {
    const [numBooks, numBookInstances, availableBookInstances, numAuthors, numGenres] = await bookService.index();
    
    res.render('index', {
      title: 'Sun Asterisk',
      book_count: numBooks,
      book_instance_count: numBookInstances,
      book_instance_available_count: availableBookInstances[1],
      author_count: numAuthors,
      genre_count: numGenres,
    });
});

export const checkExistsBook = async (req: IBookRequest, res: Response, next: NextFunction) => {
    const book = await bookService.bookDetail(parseInt(req.params.id));
    if (book === null) {
      return res.render('error', { title: t('error.notFound'), message: t('error.notFound') });
    }
  
    req.book = book;
    next();
};

// Display list of all Books
export const bookList = asyncHandler(async (req: Request, res: Response) => {
    const books = await bookService.bookList();
    res.render('books/index', { books, title: t('home.bookList'), noBooks: t('home.noBook') });
});

// Display detail page for a specific Book
export const bookDetail = [checkExistsBook, (req: IBookRequest, res: Response) => {
    res.render('books/show', {
      book: req.book,
      bookInstances: req.book?.bookInstances,
      bookGenres: req.book?.genres,
    });
  }];

// Do the same with other actions Update, Delete, Create

export const bookCreateGet = asyncHandler(async (req: Request, res: Response) => {
  const [allAuthors, allGenres] = await bookService.bookCreateGet();
  res.render('books/form', { title: t('home.createBook'), action: ActionForm.Create, authors: allAuthors, genres: allGenres });
});

export const bookCreatePost = [
  bookMiddleware.checkValidGenreBook,
  ...bookMiddleware.commonBookValidation,
  asyncHandler(async (req: IBookRequest, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      const [allAuthors, allGenres] = await bookService.bookCreateGet();
      res.render('books/form', {
        title: t('home.updateBook'),
        authors: allAuthors,
        genres: allGenres,
        book: req.body,
        errors: errors.array(),
      });
    }

    const newbook = await bookService.bookCreatePost(req.body);
    res.redirect(`/book/${newbook.id}`);
  }),
];

export const bookDeleteGet = [checkValidId, checkExistsBook, (req: IBookRequest, res: Response) => {
  const bookInstances = req.book?.bookInstances;
  res.render('books/delete', { title: t('home.deleteBook'), book: req.book, bookInstances });
}];

export const bookDeletePost = [checkValidId, checkExistsBook, asyncHandler(async (req: IBookRequest, res: Response) => {
  const bookInstances = req.book?.bookInstances;
  if (bookInstances && bookInstances.length > 0) {
    res.render('books/delete', { title: t('home.deleteBook'), book: req.body, bookInstances });
  } else {
    await bookService.bookDelete(parseInt(req.params.id));
    res.redirect('/book');
  }
})];

export const bookUpdateGet = [checkValidId, checkExistsBook, asyncHandler(async (req: IBookRequest, res: Response) => {
  const [allAuthors, allGenres] = await bookService.bookCreateGet();
  res.render('books/form', { title: t('home.updateBook'), action: ActionForm.Update, authors: allAuthors, genres: allGenres, book: req.book });
})];

export const bookUpdatePost = [
  checkValidId,
  ...bookMiddleware.commonBookValidation,
  checkExistsBook, 
  asyncHandler(async (req: IBookRequest, res: Response) => {
  const errors: Result = validationResult(req);
  if (!errors.isEmpty()) {
    const [allAuthors, allGenres] = await bookService.bookCreateGet();
    res.render('books/form', {
      title: t('home.updateBook'),
      authors: allAuthors,
      genres: allGenres,
      book: req.book,
      errors: errors.array(),
    });
    return;
  }
  if (req.book) {
    const updatedBook = await bookService.bookUpdatePost(req.book, req.book);
    res.redirect(`/book/${updatedBook.id}`);
  }
})];

