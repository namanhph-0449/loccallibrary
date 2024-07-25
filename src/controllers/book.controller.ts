import * as bookService from '../services/book.service'
import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import { t } from 'i18next';
import { BookInstanceStatus } from '../constant';

export const index = asyncHandler(async (req: Request, res: Response) => {
    const [numBooks, numBookInstances, availableBookInstances, numAuthors, numGenres] = await bookService.index();
    
    res.render('index', {
      title: 'Sun Asterisk',
      book_count: numBooks,
      book_instance_count: numBookInstances,
      book_instance_available_count: availableBookInstances[1],
      author_count: numAuthors,
      genre_count: numGenres,
      bookInstanceStatus: BookInstanceStatus
    });
});

// Display list of all Books
export const bookList = asyncHandler(async (req: Request, res: Response) => {
    const books = await bookService.bookList();
    res.render('books/index', { books, title: t('home.bookList'), noBooks: t('home.noBook') });
});
// Display detail page for a specific Book
export const bookDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`)
})
// Do the same with other actions Update, Delete, Create

export const bookCreate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Book create POST')
})

export const bookDelete = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Book delete POST')
})

export const bookUpdate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Book update POST')
})

