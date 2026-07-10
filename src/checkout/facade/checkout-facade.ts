import { Cart, Order, OrderItem, Address, User, Product } from '../../common/interfaces';
import { PaymentMethod } from '../../common/enums';
import { OrderFacade } from '../../order/facade/order-facade';
import { PaymentStrategy } from '../../payment/payment-strategy.interface';
import { CheckoutPaymentContext } from '../../payment/strategies/checkout-payment.strategy';
import { CreditCardStrategy } from '../../payment/strategies/credit-card.strategy';
import { PayPalStrategy } from '../../payment/strategies/paypal.strategy';
import { CartMediator } from '../../common/mediator/cart-mediator';
import { Logger } from '../../infrastructure/singleton/logger';

export class CheckoutFacade {
  private orderFacade: OrderFacade;
  private paymentContext: CheckoutPaymentContext;

  constructor() {
    this.orderFacade = new OrderFacade();
    this.paymentContext = new CheckoutPaymentContext(new CreditCardStrategy());
  }

  async initiateCheckout(cart: Cart, user: User, shippingAddress: Address): Promise<CheckoutResult> {
    Logger.getInstance().info(`CheckoutFacade: Initiating checkout for user ${user.id}`);

    const validation = this.validateCheckout(cart, user, shippingAddress);
    if (!validation.valid) {
      return { success: false, error: validation.error, order: null };
    }

    const orderItems: OrderItem[] = cart.items.map(item => ({
      productId: item.productId,
      productName: item.productName,
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.unitPrice * item.quantity,
    }));

    const order = await this.orderFacade.createOrder(
      user.id,
      orderItems,
      shippingAddress,
      PaymentMethod.CREDIT_CARD
    );

    const mediator = CartMediator.getInstance();
    mediator.onCheckoutCompleted(cart.id, order.id);

    Logger.getInstance().info(`CheckoutFacade: Checkout completed for order ${order.id}`);
    return { success: true, order, error: null };
  }

  setPaymentStrategy(strategy: PaymentStrategy): void {
    this.paymentContext.setStrategy(strategy);
  }

  private validateCheckout(
    cart: Cart,
    _user: User,
    _address: Address
  ): { valid: boolean; error: string | null } {
    if (!cart.items.length) {
      return { valid: false, error: 'Cart is empty' };
    }
    return { valid: true, error: null };
  }
}

export interface CheckoutResult {
  success: boolean;
  order: Order | null;
  error: string | null;
}
