import { DataSource, EntityRepository, Repository } from 'typeorm';
import { FilterBookDto } from '../dto/filter-book.dto';
import { Book } from '../entity/books.entity';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { BooksDto } from '../dto/book.dto';
import { User } from 'src/users/entity/user.entity';

@Injectable()
export class BookRepository extends Repository<Book> {
  constructor(private dataSource: DataSource) {
    super(Book, dataSource.createEntityManager());
  }

  async getAllBooks(user: User, filter: FilterBookDto): Promise<Book[]> {
    const { title, author, category, min_year, max_year } = filter;

    const query = this.createQueryBuilder('book').where(
      'book.userId = :userId',
      { userId: user.id },
    );

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

    const books = await query.getMany();

    if (books.length === 0) {
      throw new NotFoundException('Data Not Found');
    }

    return books;
  }

  async createBook(user: User, bookDto: BooksDto): Promise<void> {
    const { title, author, year, category } = bookDto;
    const book = this.create();

    book.title = title;
    book.author = author;
    book.category = category;
    book.year = year;
    book.createdAt = new Date();
    book.updatedAt = new Date();
    book.user = user;

    try {
      await book.save();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  //   async updateBook(id: string, bookDto: BooksDto): Promise<void> {
  //     const {title, author, year, category} = bookDto;
  //     const book = this.createQueryBuilder()
  //   }
}
