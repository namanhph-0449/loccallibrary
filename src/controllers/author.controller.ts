import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import * as authorService from '../services/author.service'
import { t } from 'i18next';

// Display list of all Authors.
export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authors = await authorService.authorList();
    res.render('authors/index', { authors, title: t('home.authorList'), noAuthors: t('home.noAuthor') });
})
// Display detail page for a specific Author.
export const authorDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`)
})
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
