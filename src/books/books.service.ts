import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { BooksDto } from './dto/book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BookRepository } from './repository/books.repository';
import { Book } from './entity/books.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookRepository)
    private readonly bookRepository: BookRepository,
  ) {}

  async getBooks(filter: FilterBookDto): Promise<Book[]> {
    return await this.bookRepository.getAllBooks(filter);
  }

  // private books: any[] = [];

  // getAllBooks(filter: FilterBookDto): any[] {
  //   const { title, author, category, min_year, max_year } = filter;
  //   const books = this.books.filter((book) => {
  //     if (title && book.title != title) {
  //       return false;
  //     }
  //     if (author && book.author != author) {
  //       return false;
  //     }
  //     if (category && book.category != category) {
  //       return false;
  //     }
  //     if (min_year && book.year < min_year) {
  //       return false;
  //     }

  //     if (max_year && book.year > max_year) {
  //       return false;
  //     }
  //     return true;
  //   });
  //   return books;
  // }

  // getBookById(id: string) {
  //   const bookIndex = this.findBookById(id);
  //   return this.books[bookIndex];
  // }

  // createBook(booksDto: BooksDto) {
  //   const { title, author, category, year } = booksDto;
  //   this.books.push({
  //     id: uuidv4(),
  //     title,
  //     author,
  //     category,
  //     year,
  //     createdAt: new Date(),
  //     updateAt: new Date(),
  //   });
  // }

  // updateBook(id: string, booksDto: BooksDto) {
  //   const { title, author, category } = booksDto;
  //   const bookIndex = this.findBookById(id);
  //   this.books[bookIndex].title = title;
  //   this.books[bookIndex].author = author;
  //   this.books[bookIndex].category = category;
  // }

  // findBookById(id: string) {
  //   const bookIndex = this.books.findIndex((book) => book.id === id);
  //   if (bookIndex === -1) {
  //     throw new NotFoundException(`Book with id ${id} is not found`);
  //   }

  //   return bookIndex;
  // }

  // deleteBook(id: string) {
  //   const bookIndex = this.findBookById(id);
  //   this.books.splice(bookIndex, 1);
  // }
}
