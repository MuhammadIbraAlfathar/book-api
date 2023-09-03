import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksDto } from './dto/book.dto';
import { FilterBookDto } from './dto/filter-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  getAllBooks(@Query() filter: FilterBookDto) {
    return this.bookService.getAllBooks(filter);
  }

  @Get('/:id')
  getBookById(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.getBookById(id);
  }

  @Post()
  // digunakan untuk validasi di satu route handler saja
  // @UsePipes(ValidationPipe)
  createBook(@Body() payLoad: BooksDto) {
    return this.bookService.createBook(payLoad);
  }

  @Put('/:id')
  updateBook(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: BooksDto,
  ) {
    return this.bookService.updateBook(id, payload);
  }

  @Delete('/:id')
  deleteBook(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.deleteBook(id);
  }
}
