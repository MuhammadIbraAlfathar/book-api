import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsModule } from './payments/payments.module';

@Module({
  imports: [BooksModule, MongooseModule.forRoot('mongodb://localhost:27017'), PaymentsModule],
})
export class AppModule {}
