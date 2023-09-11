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
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksDto } from './dto/book.dto';
import { FilterBookDto } from './dto/filter-book.dto';
import { Book } from './entity/books.entity';
import { UpdateBookDto } from './dto/update.book.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/users/entity/user.entity';

@Controller('books')
@UseGuards(AuthGuard('jwt'))
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get()
  async getAllBooks(
    @Query() filter: FilterBookDto,
    @GetUser() user: User,
  ): Promise<Book[]> {
    console.log(user);
    return this.bookService.getBooks(filter);
  }

  @Get('/:id')
  getBookById(@Param('id', ParseUUIDPipe) id: string) {
    return this.bookService.getBookById(id);
  }

  @Post()
  // digunakan untuk validasi di satu route handler saja
  // @UsePipes(ValidationPipe)
  async createBook(@Body() payLoad: BooksDto): Promise<void> {
    return this.bookService.createBook(payLoad);
  }

  @Put('/:id')
  async updateBook(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateBookDto,
  ): Promise<void> {
    return this.bookService.updateBook(id, payload);
  }

  @Delete('/:id')
  async deleteBook(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.bookService.deleteBook(id);
  }
}
