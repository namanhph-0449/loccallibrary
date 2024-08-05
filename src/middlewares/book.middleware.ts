import { Request, Response, NextFunction } from 'express';
import { body } from 'express-validator';
import { t } from 'i18next';
import { MIN_LENGTH } from '../constant';

export const checkValidGenreBook = (req: Request, res: Response, next: NextFunction) => {
  if (!Array.isArray(req.body.genre)) {
    req.body.genre = typeof req.body.genre === 'undefined' ? [] : [req.body.genre];
    next();
  }
};

export const commonBookValidation = [
  checkValidGenreBook,
  body('title', t('error.titleMustNotBeEmpty')).trim().isLength({ min: MIN_LENGTH }).escape(),
  body('author', t('error.authorMustNotBeEmpty')).trim().isLength({ min: MIN_LENGTH }).escape(),
  body('summary', t('error.summaryMustNotBeEmpty')).trim().isLength({ min: MIN_LENGTH }).escape(),
  body('isbn', t('error.isbnMustNotBeEmpty')).trim().isLength({ min: MIN_LENGTH }).escape(),
  body('genres.*').escape(), 
];
