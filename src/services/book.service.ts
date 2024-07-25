import { BookInstanceStatus } from '../constant/index';
import { AppDataSource } from '../config/data-source';
import { Book } from '../entity/book.entity';
import { Author } from '../entity/author.entity';
import { Genre } from '../entity/genre.entity';
import { BookInstance } from '../entity/BookInstance.entity';

const bookRepository = AppDataSource.getRepository(Book);
const authorRepository = AppDataSource.getRepository(Author);
const genreRepository = AppDataSource.getRepository(Genre);
const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

export const index = async () => {
  return await Promise.all([
    bookRepository.count(),
    bookInstanceRepository.count(),
    bookInstanceRepository.findAndCount({
      where: { status: BookInstanceStatus.Available },
    }),
    authorRepository.count(),
    genreRepository.count(),
  ]);
};

export const bookList = async () => {
    return await bookRepository.find({
      order: { title: 'ASC' },
      relations: ['author'],
    });
  };
