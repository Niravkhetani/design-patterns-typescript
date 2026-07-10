import { PaymentDetails } from '../../common/interfaces';
import { PaymentStatus } from '../../common/enums';
import { Money } from '../../common/types';
import { PaymentProcessor } from '../payment-processor.interface';
import { PaymentMethod } from '../../common/enums';
import { Logger } from '../../infrastructure/singleton/logger';

export class PayPalProcessor implements PaymentProcessor {
  readonly name = 'PayPal';

  async processPayment(orderId: string, amount: Money): Promise<PaymentDetails> {
    Logger.getInstance().info(`Processing PayPal payment: ${amount.amount} ${amount.currency}`);
    return {
      id: `pp_pay_${Date.now()}`,
      orderId,
      method: PaymentMethod.PAYPAL,
      amount: amount.amount,
      currency: amount.currency,
      status: PaymentStatus.COMPLETED,
      transactionId: `txn_pp_${Date.now()}`,
      metadata: { payerEmail: 'buyer@paypal.com' },
      createdAt: new Date(),
    };
  }

  async refundPayment(paymentId: string): Promise<PaymentDetails> {
    Logger.getInstance().info(`Refunding PayPal payment: ${paymentId}`);
    return {
      id: paymentId,
      orderId: '',
      method: PaymentMethod.PAYPAL,
      amount: 0,
      currency: 'USD',
      status: PaymentStatus.REFUNDED,
      transactionId: `ref_pp_${Date.now()}`,
      metadata: {},
      createdAt: new Date(),
    };
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    return PaymentStatus.COMPLETED;
  }
}
