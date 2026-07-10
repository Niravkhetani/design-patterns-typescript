import { PaymentDetails } from '../common/interfaces';
import { Money } from '../common/types';

export interface PaymentStrategy {
  pay(orderId: string, amount: Money): Promise<PaymentDetails>;
  refund(paymentId: string): Promise<PaymentDetails>;
}
