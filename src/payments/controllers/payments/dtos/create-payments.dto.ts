import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class CreatePaymentsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;
}
