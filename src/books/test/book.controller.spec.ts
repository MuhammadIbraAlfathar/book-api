import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../books.controller';
import { BooksService } from '../books.service';
import { BookRepository } from '../repository/book.repository';
import { BooksModule } from '../books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookDocument, BookSchema, Books } from '../schemas/books.schema';
import { Model } from 'mongoose';
import { AppModule } from 'src/app.module';

describe('BooksController', () => {
  let controller: BooksController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [BooksModule],
      controllers: [BooksController],
      providers: [BooksService],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    jest.clearAllMocks();
  });

  describe('getAllBook', () => {
    it('should return an array of books', async () => {
      const mockBooks = [
        {
          bookId: 'a135cbd5-b382-4e9f-ad2f-90003f604c7a',
          title: 'Scala',
          author: 'Yono',
          category: 'Programming',
          year: 2020,
          _id: '64ffe7965bdf18c63c1da49b',
          __v: 0,
        },
        {
          bookId: 'a135cbd5-b382-4e9f-ad2f-90003f604c7a',
          title: 'Perl',
          author: 'Joko',
          category: 'Programming',
          year: 2022,
          _id: '64ffe7963bdf18c63c1da49b',
          __v: 0,
        },
      ];

      jest.spyOn(controller, 'getAllBooks').mockResolvedValue(mockBooks);

      const result = await controller.getAllBooks();
      expect(result).toBeCalledWith(mockBooks);
    });
  });
});
