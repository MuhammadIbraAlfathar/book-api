import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsController } from './payments.controller';
import { Request, Response } from 'express';
// import { PaymentsService } from 'src/payments/service/payments/payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  // let paymentService: PaymentsService;

  const statusResponseMock = {
    send: jest.fn((x) => x),
  };

  const requestMock = { query: {} } as unknown as Request;

  const responseMock = {
    status: jest.fn(() => statusResponseMock),
    send: jest.fn((x) => x),
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsController],
      // providers: [
      //   {
      //     provide: 'PAYMENT_SERVICE',
      //     useValue: {
      //       createPayment: jest.fn((x) => x),
      //     },
      //   },
      // ],
    }).compile();

    controller = module.get<PaymentsController>(PaymentsController);
    // paymentService = module.get<PaymentsService>('PAYMENT_SERVICE');
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // it('payment services should be defined', () => {
  //   expect(paymentService).toBeDefined();
  // });

  describe('getPayments', () => {
    it('should return a status of 400', () => {
      controller.getPayment(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(400);
      expect(statusResponseMock.send).toHaveBeenCalledWith({
        msg: 'Missing count or page query paramater',
      });
    });

    it('should return a status of 200 when query params are present', () => {
      requestMock.query = {
        count: '10',
        page: '1',
      };
      controller.getPayment(requestMock, responseMock);
      expect(responseMock.status).toHaveBeenCalledWith(200);
    });
  });

  // describe('createPayment', async () => {
  //   it('should return a successful response', async () => {
  //     const response = await controller.createPayment({
  //       email: 'anton@gmail.com',
  //       price: 100,
  //     });
  //   });
  // });
});
