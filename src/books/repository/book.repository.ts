import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BookDocument, Books } from '../schemas/books.schema';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class BookRepository {
  constructor(
    @InjectModel(Books.name) private bookModel: Model<BookDocument>,
  ) {}

  async findBook(bookFilterQuery: FilterQuery<Books>): Promise<Books> {
    return this.bookModel.findOne(bookFilterQuery);
  }

  async getAllBook(bookFilterQuery: FilterQuery<Books>): Promise<Books[]> {
    return this.bookModel.find(bookFilterQuery);
  }

  async createBook(books: Books): Promise<Books> {
    const newUser = new this.bookModel(books);
    return newUser.save();
  }

  async updateBook(
    bookFilterQuery: FilterQuery<Books>,
    book: Partial<Books>,
  ): Promise<void> {
    return this.bookModel.findOneAndUpdate(bookFilterQuery, book);
  }

  async deleteBook(bookId: string): Promise<void> {
    this.bookModel.deleteOne({ bookId });
  }
}
