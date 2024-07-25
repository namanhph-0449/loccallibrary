import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'

// Display list of all Authors.
export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Author list')
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
