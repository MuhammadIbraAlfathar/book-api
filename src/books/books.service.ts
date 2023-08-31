import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BooksService {
  private books: any[] = [];

  getAllBooks(): any[] {
    return this.books;
  }

  getBookById(id: string) {
    const bookIndex = this.findBookById(id);
    return this.books[bookIndex];
  }

  createBook(title: string, author: string, category: string) {
    this.books.push({
      id: uuidv4(),
      title,
      author,
      category,
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
}
