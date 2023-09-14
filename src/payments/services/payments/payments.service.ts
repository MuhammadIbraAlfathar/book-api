import { Injectable, BadRequestException } from '@nestjs/common';
import { CreatePaymentsDto } from 'src/payments/controllers/payments/dtos/create-payments.dto';

@Injectable()
export class PaymentsService {
  private users = [
    {
      email: 'ibra@gmail.com',
    },
    {
      email: 'anton@gmail.com',
    },
    {
      email: 'sendy@gmail.com',
    },
  ];

  async createPayments(paymentsDto: CreatePaymentsDto) {
    const { email } = paymentsDto;
    const user = this.users.find((user) => user.email === email);

    if (user) {
      return {
        id: 1,
        status: 'success',
      };
    } else {
      throw new BadRequestException();
    }
  }
}
