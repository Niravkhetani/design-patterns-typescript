import { PaymentMethod } from '../common/enums';
import { PaymentProcessor } from './payment-processor.interface';
import { CreditCardProcessor } from './processors/credit-card.processor';
import { PayPalProcessor } from './processors/paypal.processor';
import { CryptoProcessor } from './processors/crypto.processor';

export abstract class PaymentProcessorFactory {
  abstract createProcessor(method: PaymentMethod): PaymentProcessor;

  executePayment(method: PaymentMethod, orderId: string, amount: { amount: number; currency: string }) {
    const processor = this.createProcessor(method);
    return processor.processPayment(orderId, amount);
  }
}

export class StandardPaymentFactory extends PaymentProcessorFactory {
  createProcessor(method: PaymentMethod): PaymentProcessor {
    switch (method) {
      case PaymentMethod.CREDIT_CARD:
        return new CreditCardProcessor();
      case PaymentMethod.PAYPAL:
        return new PayPalProcessor();
      case PaymentMethod.CRYPTO:
        return new CryptoProcessor();
      default:
        throw new Error(`Unsupported payment method: ${method}`);
    }
  }
}
