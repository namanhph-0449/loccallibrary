import * as bookService from '../services/book.service'
import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'


export const index = asyncHandler(async (req: Request, res: Response) => {
    const [numBooks, numBookInstances, availableBookInstances, numAuthors, numGenres] = await bookService.index();
  
    // i18next.changeLanguage(req.query.lng as string);
  
    res.render('index', {
      title: 'Sun Asterisk',
      book_count: numBooks,
      book_instance_count: numBookInstances,
      book_instance_available_count: availableBookInstances[1],
      author_count: numAuthors,
      genre_count: numGenres,
    });
});

// Display list of all Books
export const bookList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Book list')
})
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

