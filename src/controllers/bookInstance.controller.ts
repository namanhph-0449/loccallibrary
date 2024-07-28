import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import { t } from 'i18next'
import * as bookInstanceService from '../services/bookInstance.service'
import { BookInstance } from '../entity/BookInstance.entity';
import { BookInstanceStatus } from '../constant';

interface IBookInstanceRequest extends Request {
  bookInstance?: BookInstance | null;
}

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
export const bookInstanceCreate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: BookInstance create POST')
})

export const bookInstanceDelete = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: BookInstance delete POST')
})

export const bookInstanceUpdate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: BookInstance update POST')
})
