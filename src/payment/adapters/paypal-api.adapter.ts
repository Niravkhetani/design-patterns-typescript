import { PaymentDetails } from '../../common/interfaces';
import { Money } from '../../common/types';
import { PaymentProcessor } from '../payment-processor.interface';
import { PaymentMethod, PaymentStatus } from '../../common/enums';

class PayPalApi {
  async createOrder(params: { amount: string; currency: string }) {
    return { id: `paypal_order_${Date.now()}`, status: 'COMPLETED', ...params };
  }

  async captureOrder(orderId: string) {
    return { id: `capture_${orderId}`, status: 'COMPLETED' };
  }

  async refundOrder(captureId: string) {
    return { id: `refund_${captureId}`, status: 'COMPLETED' };
  }
}

export class PayPalApiAdapter implements PaymentProcessor {
  readonly name = 'PayPalAPI';
  private api: PayPalApi;

  constructor() {
    this.api = new PayPalApi();
  }

  async processPayment(orderId: string, amount: Money): Promise<PaymentDetails> {
    const order = await this.api.createOrder({
      amount: amount.amount.toFixed(2),
      currency: amount.currency,
    });
    const capture = await this.api.captureOrder(order.id);
    return {
      id: `paypal_api_${capture.id}`,
      orderId,
      method: PaymentMethod.PAYPAL,
      amount: amount.amount,
      currency: amount.currency,
      status: PaymentStatus.COMPLETED,
      transactionId: capture.id,
      metadata: { adapter: 'PayPalApiAdapter' },
      createdAt: new Date(),
    };
  }

  async refundPayment(paymentId: string): Promise<PaymentDetails> {
    const refund = await this.api.refundOrder(paymentId);
    return {
      id: `refund_${refund.id}`,
      orderId: '',
      method: PaymentMethod.PAYPAL,
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
