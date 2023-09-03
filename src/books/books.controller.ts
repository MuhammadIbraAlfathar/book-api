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
import { BooksDto } from './dto/book.dto';

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
  createBook(@Body() payLoad: BooksDto) {
    return this.bookService.createBook(payLoad);
  }

  @Put('/:id')
  updateBook(@Param('id') id: string, @Body() payload: BooksDto) {
    return this.bookService.updateBook(id, payload);
  }

  @Delete('/:id')
  deleteBook(@Param('id') id: string) {
    return this.bookService.deleteBook(id);
  }
}
