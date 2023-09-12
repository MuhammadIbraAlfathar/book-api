import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Books & Document;

@Schema()
export class Books {
  @Prop()
  bookId: string;

  @Prop()
  title: string;

  @Prop()
  author: string;

  @Prop()
  category: string;

  @Prop()
  year: number;
}

export const BookSchema = SchemaFactory.createForClass(Books);
