import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import { t } from 'i18next'
import * as genreService from '../services/genre.service'

// Display list of all Genres.
export const genreList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genres = await genreService.genreList()
    res.render('genres/index', { genres, title: t('home.genreList'), noGenres: t('home.noGenre') })
})
// Display detail page for a specific Genre.
export const genreDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`)
})

// Do the same with other actions Update, Delete, Create
export const genreCreate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Genre create POST')
})

export const genreDelete = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Genre delete POST')
})

export const genreUpdate = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Genre update POST')
})
