import { IsEmail, IsNotEmpty, IsNumberString } from 'class-validator';

export class PaymentsDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;
}
