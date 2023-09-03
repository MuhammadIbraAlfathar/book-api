import { IsNotEmpty, IsInt } from 'class-validator';

export class BooksDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  @IsInt()
  year: string;
}
