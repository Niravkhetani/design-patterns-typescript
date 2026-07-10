import { PaymentDetails } from '../../common/interfaces';
import { PaymentStatus } from '../../common/enums';
import { Money } from '../../common/types';
import { PaymentStrategy } from '../payment-strategy.interface';
import { PaymentMethod } from '../../common/enums';

export class PayPalStrategy implements PaymentStrategy {
  async pay(orderId: string, amount: Money): Promise<PaymentDetails> {
    return {
      id: `strategy_pp_${Date.now()}`,
      orderId,
      method: PaymentMethod.PAYPAL,
      amount: amount.amount,
      currency: amount.currency,
      status: PaymentStatus.COMPLETED,
      transactionId: `txn_strat_pp_${Date.now()}`,
      metadata: { strategy: 'PayPalStrategy' },
      createdAt: new Date(),
    };
  }

  async refund(paymentId: string): Promise<PaymentDetails> {
    return {
      id: paymentId,
      orderId: '',
      method: PaymentMethod.PAYPAL,
      amount: 0,
      currency: 'USD',
      status: PaymentStatus.REFUNDED,
      metadata: {},
      createdAt: new Date(),
    };
  }
}
