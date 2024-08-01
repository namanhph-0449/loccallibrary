import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import * as authorService from '../services/author.service'
import { t } from 'i18next';
import { Author } from '../entity/author.entity';

interface IAuthorRequest extends Request {
  author?: Author | null;
}

const checkExistsAuthor = async (req: IAuthorRequest, res: Response, next: NextFunction) => {
  const author = await authorService.authorDetail(parseInt(req.params.id));
  if (author === null) {
    res.render('error', { title: t('error.notFound'), message: t('error.notFound') });
  }

  req.author = author;
  next();
};

// Display list of all Authors.
export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authors = await authorService.authorList();
    res.render('authors/index', { authors, title: t('home.authorList'), noAuthors: t('home.noAuthor') });
})

// Display detail page for a specific Author.
export const authorDetail = [checkExistsAuthor, (req: IAuthorRequest, res: Response) => {
    res.render('authors/show', {
        author: req.author,
        books: req.author?.books,
    });
}];

// Do the same with other actions Update, Delete, Create
export const authorCreate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Author create POST')
})

export const authorDelete = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Author delete POST')
})

export const authorUpdate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Author update POST')
})
