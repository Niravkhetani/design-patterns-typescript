import { PaymentDetails } from '../../common/interfaces';
import { PaymentStatus } from '../../common/enums';
import { Money } from '../../common/types';
import { PaymentProcessor } from '../payment-processor.interface';
import { PaymentMethod } from '../../common/enums';
import { Logger } from '../../infrastructure/singleton/logger';

export class CryptoProcessor implements PaymentProcessor {
  readonly name = 'Crypto';

  async processPayment(orderId: string, amount: Money): Promise<PaymentDetails> {
    Logger.getInstance().info(`Processing crypto payment: ${amount.amount} ${amount.currency}`);
    return {
      id: `crypto_pay_${Date.now()}`,
      orderId,
      method: PaymentMethod.CRYPTO,
      amount: amount.amount,
      currency: amount.currency,
      status: PaymentStatus.COMPLETED,
      transactionId: `txn_crypto_${Date.now()}`,
      metadata: { walletAddress: '0x742...dEad' },
      createdAt: new Date(),
    };
  }

  async refundPayment(paymentId: string): Promise<PaymentDetails> {
    Logger.getInstance().info(`Refunding crypto payment: ${paymentId}`);
    return {
      id: paymentId,
      orderId: '',
      method: PaymentMethod.CRYPTO,
      amount: 0,
      currency: 'USD',
      status: PaymentStatus.REFUNDED,
      transactionId: `ref_crypto_${Date.now()}`,
      metadata: {},
      createdAt: new Date(),
    };
  }

  async getPaymentStatus(paymentId: string): Promise<PaymentStatus> {
    const confirmations = 12;
    return confirmations >= 6 ? PaymentStatus.COMPLETED : PaymentStatus.PENDING;
  }
}
