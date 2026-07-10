import { PaymentDetails } from '../../common/interfaces';
import { Money } from '../../common/types';
import { PaymentProcessor } from '../payment-processor.interface';
import { PaymentMethod, PaymentStatus } from '../../common/enums';

class StripeSdk {
  async chargesCreate(params: { amount: number; currency: string; source: string }) {
    return { id: `stripe_${Date.now()}`, status: 'succeeded', ...params };
  }

  async refundCreate(params: { charge: string }) {
    return { id: `ref_${params.charge}`, status: 'succeeded' };
  }
}

export class StripeAdapter implements PaymentProcessor {
  readonly name = 'Stripe';
  private sdk: StripeSdk;

  constructor() {
    this.sdk = new StripeSdk();
  }

  async processPayment(orderId: string, amount: Money): Promise<PaymentDetails> {
    const charge = await this.sdk.chargesCreate({
      amount: Math.round(amount.amount * 100),
      currency: amount.currency.toLowerCase(),
      source: 'tok_visa',
    });
    return {
      id: `stripe_pay_${charge.id}`,
      orderId,
      method: PaymentMethod.STRIPE,
      amount: amount.amount,
      currency: amount.currency,
      status: PaymentStatus.COMPLETED,
      transactionId: charge.id,
      metadata: { adapter: 'StripeAdapter' },
      createdAt: new Date(),
    };
  }

  async refundPayment(paymentId: string): Promise<PaymentDetails> {
    const refund = await this.sdk.refundCreate({ charge: paymentId });
    return {
      id: `refund_${refund.id}`,
      orderId: '',
      method: PaymentMethod.STRIPE,
      amount: 0,
      currency: 'USD',
      status: PaymentStatus.REFUNDED,
      metadata: {},
      createdAt: new Date(),
    };
  }

  async getPaymentStatus(_paymentId: string): Promise<PaymentStatus> {
    return PaymentStatus.COMPLETED;
  }
}
