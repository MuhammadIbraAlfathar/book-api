import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateBookDto } from './dto/create-book.dto';

@Injectable()
export class BooksService {
  private books: any[] = [];

  getAllBooks(title: string, author: string, category: string): any[] {
    const books = this.books.filter((book) => {
      let isMatch = true;
      if (title && book.title != title) {
        isMatch = false;
      }
      if (author && book.author != author) {
        isMatch = false;
      }
      if (category && book.category != category) {
        isMatch = false;
      }
      return isMatch;
    });
    return books;
  }

  getBookById(id: string) {
    const bookIndex = this.findBookById(id);
    return this.books[bookIndex];
  }

  createBook(createBookDto: CreateBookDto) {
    const { title, author, category, year } = createBookDto;
    this.books.push({
      id: uuidv4(),
      title,
      author,
      category,
      year,
      createdAt: new Date(),
      updateAt: new Date(),
    });
  }

  updateBook(id: string, title: string, author: string, category: string) {
    const bookIndex = this.findBookById(id);
    this.books[bookIndex].title = title;
    this.books[bookIndex].author = author;
    this.books[bookIndex].category = category;
  }

  findBookById(id: string) {
    const bookIndex = this.books.findIndex((book) => book.id === id);
    if (bookIndex === -1) {
      throw new NotFoundException(`Book with id ${id} is not found`);
    }

    return bookIndex;
  }

  deleteBook(id: string) {
    const bookIndex = this.findBookById(id);
    this.books.splice(bookIndex, 1);
  }
}
