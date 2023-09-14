import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreatePaymentsDto } from 'src/payments/controllers/payments/dtos/create-payments.dto';
import { PaymentsService } from 'src/payments/services/payments/payments.service';
// import { PaymentsDto } from 'src/payments/dto/payments.dto';
// import { PaymentsService } from 'src/payments/service/payments/payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(
    @Inject('PAYMENTS_SERVICE')
    private readonly paymentsService: PaymentsService, // @Inject('PAYMENT_SERVICE') private readonly paymentService: PaymentsService,
  ) {}

  @Get()
  getPayment(@Req() request: Request, @Res() response: Response) {
    const { count, page } = request.query;
    if (!count || !page) {
      response
        .status(400)
        .send({ msg: 'Missing count or page query paramater' });
    } else {
      response.status(200);
    }
  }

  @Post('create')
  async createPayment(@Body() createPaymentDto: CreatePaymentsDto) {
    this.paymentsService.createPayments(createPaymentDto);
  }

  // @Post('create')
  // async createPayment(@Body() createPaymentDto: PaymentsDto) {
  //   return await this.paymentService.createPayments(createPaymentDto);
  // }
}
