import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigs } from './books/config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfigs), BooksModule],
})
export class AppModule {}
