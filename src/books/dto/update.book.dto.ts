import { IsOptional } from 'class-validator';

export class UpdateBookDto {
  @IsOptional()
  title: string;

  @IsOptional()
  author: string;

  @IsOptional()
  category: string;

  @IsOptional()
  year: number;
}
