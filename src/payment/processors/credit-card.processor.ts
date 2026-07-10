import { PaymentDetails } from '../../common/interfaces';
import { PaymentStatus } from '../../common/enums';
import { Money } from '../../common/types';
import { PaymentProcessor } from '../payment-processor.interface';
import { PaymentMethod } from '../../common/enums';
import { Logger } from '../../infrastructure/singleton/logger';

export class CreditCardProcessor implements PaymentProcessor {
  readonly name = 'CreditCard';

  async processPayment(orderId: string, amount: Money): Promise<PaymentDetails> {
    Logger.getInstance().info(`Processing credit card payment: ${amount.amount} ${amount.currency}`);
    return {
      id: `cc_pay_${Date.now()}`,
      orderId,
      method: PaymentMethod.CREDIT_CARD,
      amount: amount.amount,
      currency: amount.currency,
      status: PaymentStatus.COMPLETED,
      transactionId: `txn_cc_${Date.now()}`,
      metadata: { cardLastFour: '4242' },
      createdAt: new Date(),
    };
  }

  async refundPayment(paymentId: string): Promise<PaymentDetails> {
    Logger.getInstance().info(`Refunding credit card payment: ${paymentId}`);
    return {
      id: paymentId,
      orderId: '',
      method: PaymentMethod.CREDIT_CARD,
      amount: 0,
      currency: 'USD',
      status: PaymentStatus.REFUNDED,
      transactionId: `ref_cc_${Date.now()}`,
      metadata: {},
      createdAt: new Date(),
    };
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    return PaymentStatus.COMPLETED;
  }
}
