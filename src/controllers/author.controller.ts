import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import * as authorService from '../services/author.service'
import { t } from 'i18next';
import { Author } from '../entity/author.entity';
import { body, Result, validationResult } from 'express-validator';
import { checkValidId } from '../middlewares';
import { ActionForm } from '../constant';
import * as authMiddleware from '../middlewares/author.middleware';

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
export const authorCreateGet = (req: Request, res: Response) => {
  res.render('authors/form', { title: t('home.createAuthor'), action: ActionForm.Create });
};

export const authorCreatePost = [
  ...authMiddleware.commonAuthorValidation, 
  (req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    if (errors.isEmpty()) {
      const newAuthor = authorService.authorCreate(req.body);

      if (newAuthor) {
        res.redirect(`/author/${newAuthor.id}`);
      } else {
        res.redirect('/author');
      }
    }

    res.render('authors/form', {
      title: t('home.createAuthor'),
      action: 'create',
      errors: errors.array(),
    });
  },
];

export const authorDeleteGet = [checkValidId, checkExistsAuthor, (req: IAuthorRequest, res: Response) => {
  const allBooksByAuthor = req.author?.books;
  res.render('authors/delete', { title: t('home.deleteAuthor'), author: req.author, authorBooks: allBooksByAuthor });
}]

export const authorDeletePost = [checkValidId, checkExistsAuthor, asyncHandler(async (req: IAuthorRequest, res: Response) => {
  const allBooksByAuthor = req.author?.books;
  if (allBooksByAuthor && allBooksByAuthor.length > 0) {
    res.render('authors/delete', {
      title: t('home.deleteAuthor'),
      author: req.author,
      authorBooks: allBooksByAuthor,
    });
    return;
  } else {
    await authorService.authorDelete(parseInt(req.params.id));
    res.redirect('/author');
  }
})];

export const authorUpdateGet = [checkValidId, checkExistsAuthor, (req: IAuthorRequest, res: Response) => {
  res.render('authors/form', { title: t('home.updateAuthor'), action: ActionForm.Update, author: req.author });
}];

export const authorUpdatePost = [
  checkValidId,
  ...authMiddleware.commonAuthorValidation,  
  checkExistsAuthor, 
  asyncHandler(async (req: IAuthorRequest, res: Response) => {
  const errors: Result = validationResult(req);
  if (!errors.isEmpty()) {
    res.render('authors/form', {
      title: t('home.updateAuthor'),
      action: ActionForm.Update,
      author: req.body,
      errors: errors.array(),
    });
  }
  if (req.author) {
    const newAuthor = await authorService.authorUpdate(req.author, req.body);
    if (newAuthor) {
      res.redirect('/');
    } else {
      res.redirect('/author');
    }
  }
})];
