import { PaymentDetails } from '../../common/interfaces';
import { Money } from '../../common/types';
import { PaymentStrategy } from '../payment-strategy.interface';
import { Logger } from '../../infrastructure/singleton/logger';

export class CheckoutPaymentContext {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy: PaymentStrategy): void {
    Logger.getInstance().info(`Switching payment strategy to: ${strategy.constructor.name}`);
    this.strategy = strategy;
  }

  async executePayment(orderId: string, amount: Money): Promise<PaymentDetails> {
    Logger.getInstance().info(`Executing payment with strategy: ${this.strategy.constructor.name}`);
    return this.strategy.pay(orderId, amount);
  }

  async executeRefund(paymentId: string): Promise<PaymentDetails> {
    return this.strategy.refund(paymentId);
  }
}
