import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import { t } from 'i18next'
import * as bookInstanceService from '../services/bookInstance.service'
import { BookInstance } from '../entity/BookInstance.entity';
import { ActionForm, BookInstanceStatus } from '../constant';
import { body, Result, validationResult } from 'express-validator';
import { checkValidId } from '../middlewares';
interface IBookInstanceRequest extends Request {
  bookInstance?: BookInstance | null;
}

export const checkExistsBookInstance = async (req: IBookInstanceRequest, res: Response, next: NextFunction) => {
    const bookInstance = await bookInstanceService.bookInstanceDetail(parseInt(req.params.id));
    if (bookInstance === null) {
      res.render('error', { title: t('error.notFound'), message: t('error.notFound') });
    }
  
    req.bookInstance = bookInstance;
    next();
  };

// Display list of all BookInstances
export const bookInstanceList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const bookInstances = await bookInstanceService.bookInstanceList()
    res.render('bookInstances/index', { 
      bookInstances, 
      title: t('home.bookInstanceList'), 
      noBookInstances: t('home.noBookInstance'),
      bookInstanceStatus: BookInstanceStatus
    })
})
// Display detail page for a specific BookInstance
export const bookInstanceDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`)
})

// Do the same with other actions Update, Delete, Create
export const bookInstanceCreateGet = asyncHandler(async (req: Request, res: Response) => {
    const books = await bookInstanceService.bookInstanceCreateGet();
    res.render('bookInstances/form', { title: t('home.createBook'), action: ActionForm.Create, books, statuses: BookInstanceStatus });
  });

  export const bookInstanceCreatePost = [
    body('imprint', t('error.imprintMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
    body('status', t('error.statusMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
    body('book', t('error.bookMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
    asyncHandler(async (req: IBookInstanceRequest, res: Response) => {
      const errors: Result = validationResult(req);
      if (!errors.isEmpty()) {
        const books = await bookInstanceService.bookInstanceCreateGet();
        res.render('bookInstances/form', {
          title: t('home.createBook'),
          action: ActionForm.Create,
          books,
          statuses: BookInstanceStatus,
          bookInstance: req.body,
          errors: errors.array(),
        });
      }
      const newBookInstance = bookInstanceService.bookInstanceCreatePost(req.body);
      res.redirect(`/bookInstance/${newBookInstance.id}`);
  }),
];

export const bookInstanceUpdateGet = [checkValidId, checkExistsBookInstance, asyncHandler(async (req: IBookInstanceRequest, res: Response) => {
  const books = await bookInstanceService.bookInstanceCreateGet();
  res.render('bookInstances/form', { title: t('home.updateBook'), action: ActionForm.Update, books, bookInstance: req.bookInstance, statuses: BookInstanceStatus });
})];

export const bookInstanceUpdatePost = [
  checkValidId, 
  body('imprint', t('error.imprintMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  body('status', t('error.statusMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  body('book', t('error.bookMustNotBeEmpty')).trim().isLength({ min: 1 }).escape(),
  checkExistsBookInstance, 
  asyncHandler(async (req: IBookInstanceRequest, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      const books = await bookInstanceService.bookInstanceCreateGet();
      res.render('bookInstances/form', {
        title: t('home.updateBook'),
        action: ActionForm.Update,
        books,
        statuses: BookInstanceStatus,
        bookInstance: req.body,
        errors: errors.array(),
      });
    }
    if(req.bookInstance) {
        const updatedBookInstance = await bookInstanceService.bookInstanceUpdatePost(req.bookInstance, req.body);
        res.redirect(`/bookInstance/${updatedBookInstance.id}`);
    }
  },
)];

export const bookInstanceDeleteGet = [checkValidId, checkExistsBookInstance, (req: IBookInstanceRequest, res: Response) => {
  res.render('bookInstances/delete', { title: t('home.deleteBook'), bookInstance: req.bookInstance });
}];

export const bookInstanceDeletePost = [checkValidId, checkExistsBookInstance, asyncHandler(async (req: Request, res: Response) => {
  await bookInstanceService.bookInstanceDeletePost(parseInt(req.params.id));
  res.redirect('/bookInstance');
})];
