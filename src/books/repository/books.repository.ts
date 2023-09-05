import { EntityRepository, Repository } from 'typeorm';
import { FilterBookDto } from '../dto/filter-book.dto';
import { Book } from '../entity/books.entity';

@EntityRepository(Book)
export class BookRepository extends Repository<Book> {
  async getAllBooks(filter: FilterBookDto): Promise<Book[]> {
    const { title, author, category, min_year, max_year } = filter;

    const query = this.createQueryBuilder('book');

    if (title) {
      query.andWhere('lower(book.title) LIKE :title', {
        title: `%${title.toLocaleLowerCase()}%`,
      });
    }

    if (author) {
      query.andWhere('lower(book.author) LIKE :author', {
        author: `%${author.toLocaleLowerCase()}%`,
      });
    }

    if (category) {
      query.andWhere('lower(book.category) LIKE :category', {
        category: `%${category.toLocaleLowerCase()}%`,
      });
    }

    if (min_year) {
      query.andWhere('book.year >= min_year', { min_year });
    }

    if (max_year) {
      query.andWhere('book.year <= max_year', { max_year });
    }

    return await query.getMany();
  }
}
