import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { BooksDto } from './dto/book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { BookRepository } from './repository/book.repository';
import { Books } from './schemas/books.schema';
import { UpdateBook } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(private readonly bookRepository: BookRepository) {}

  async getBookById(bookId: string): Promise<Books> {
    return this.bookRepository.findBook({ bookId });
  }

  async getAllBook(): Promise<Books[]> {
    return this.bookRepository.getAllBook({});
  }

  async createBook(bookDto: BooksDto): Promise<Books> {
    const { title, author, category, year } = bookDto;
    return this.bookRepository.createBook({
      bookId: uuidv4(),
      title,
      author,
      category,
      year,
    });
  }

  async updateBook(bookId: string, bookUpdate: UpdateBook): Promise<void> {
    return this.bookRepository.updateBook({ bookId }, bookUpdate);
  }

  async deleteBook(bookId: string): Promise<void> {
    return this.bookRepository.deleteBook(bookId);
  }
}
