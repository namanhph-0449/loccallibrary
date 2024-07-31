import { AppDataSource } from '../config/data-source';
import { Author } from '../entity/author.entity';

const authorRepository = AppDataSource.getRepository(Author);

export const authorList = async () => {
  return await authorRepository.find({
    order: { firstName: 'ASC' },
  });
};
