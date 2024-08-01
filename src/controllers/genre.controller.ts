import { Request, Response, NextFunction } from 'express'
import asyncHandler from 'express-async-handler'
import { t } from 'i18next'
import * as genreService from '../services/genre.service'
import { Genre } from '../entity/genre.entity';

interface IGenreRequest extends Request {
  genre?: Genre | null;
}

export const checkExistsGenre = async (req: IGenreRequest, res: Response, next: NextFunction) => {
  const genre = await genreService.genreDetail(parseInt(req.params.id));
  if (genre === null) {
    res.render('error', { title: t('error.notFound'), message: t('error.notFound') });
  }

  req.genre = genre;
  next();
};

// Display list of all Genres.
export const genreList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genres = await genreService.genreList()
    res.render('genres/index', { genres, title: t('home.genreList'), noGenres: t('home.noGenre') })
})

// Display detail page for a specific Genre.
export const genreDetail = [checkExistsGenre, (req: IGenreRequest, res: Response) => {
  res.render('genres/show', {
    genre: req.genre,
    books: req.genre?.books,
  });
}];

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
