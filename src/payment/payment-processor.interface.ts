import { PaymentDetails } from '../common/interfaces';
import { PaymentStatus } from '../common/enums';
import { Money } from '../common/types';

export interface PaymentProcessor {
  readonly name: string;
  processPayment(orderId: string, amount: Money): Promise<PaymentDetails>;
  refundPayment(paymentId: string): Promise<PaymentDetails>;
  getPaymentStatus(paymentId: string): Promise<PaymentStatus>;
}
