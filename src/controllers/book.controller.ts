import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

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

