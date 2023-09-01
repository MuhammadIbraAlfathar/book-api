import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { title } from 'process';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  getAllBooks(
    @Query('title') title: string,
    @Query('author') author: string,
    @Query('category') category: string,
  ) {
    return this.bookService.getAllBooks(title, author, category);
  }

  @Get('/:id')
  getBookById(@Param('id') id: string) {
    return this.bookService.getBookById(id);
  }

  @Post()
  createBook(@Body('title') payLoad: CreateBookDto) {
    return this.bookService.createBook(payLoad);
  }

  @Put('/:id')
  updateBook(
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('author') author: string,
    @Body('category') category: string,
  ) {
    return this.bookService.updateBook(id, title, author, category);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
