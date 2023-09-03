import { IsOptional } from 'class-validator';

export class FilterBookDto {
  @IsOptional()
  title: string;

  @IsOptional()
  author: string;

  @IsOptional()
  category: string;

  @IsOptional()
  max_year: number;

  @IsOptional()
  min_year: number;
}
