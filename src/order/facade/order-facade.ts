import { Order, OrderItem, Address } from '../../common/interfaces';
import { PaymentMethod, OrderStatus, PaymentStatus } from '../../common/enums';
import { OrderContext } from '../state/order-context';
import { OrderCommandInvoker } from '../commands/order-invoker';
import { PlaceOrderCommand } from '../commands/place-order.command';
import { CancelOrderCommand } from '../commands/cancel-order.command';
import { RefundOrderCommand } from '../commands/refund-order.command';
import { PaymentProcessorFactory, StandardPaymentFactory } from '../../payment/payment-factory';
import { Logger } from '../../infrastructure/singleton/logger';

export class OrderFacade {
  private stateContext: OrderContext;
  private commandInvoker: OrderCommandInvoker;
  private paymentFactory: PaymentProcessorFactory;

  constructor() {
    this.stateContext = new OrderContext();
    this.commandInvoker = new OrderCommandInvoker();
    this.paymentFactory = new StandardPaymentFactory();
  }

  async createOrder(
    userId: string,
    items: OrderItem[],
    shippingAddress: Address,
    paymentMethod: PaymentMethod
  ): Promise<Order> {
    Logger.getInstance().info(`OrderFacade: Creating order for user ${userId}`);

    const totalAmount = items.reduce((sum, item) => sum + item.totalPrice, 0);

    const order: Order = {
      id: `order_${Date.now()}`,
      userId,
      items,
      status: OrderStatus.PENDING,
      totalAmount,
      currency: 'USD',
      shippingAddress,
      paymentMethod,
      paymentStatus: PaymentStatus.PENDING,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const confirmed = await this.commandInvoker.executeCommand(new PlaceOrderCommand(), order);
    this.stateContext.advance('confirm');

    const payment = await this.paymentFactory.executePayment(paymentMethod, confirmed.id, {
      amount: totalAmount,
      currency: 'USD',
    });

    Logger.getInstance().info(`OrderFacade: Payment ${payment.status} for order ${order.id}`);
    return confirmed;
  }

  async cancelOrder(order: Order): Promise<Order> {
    Logger.getInstance().info(`OrderFacade: Cancelling order ${order.id}`);
    this.stateContext.advance('cancel');
    return this.commandInvoker.executeCommand(new CancelOrderCommand(), order);
  }

  async refundOrder(order: Order): Promise<Order> {
    Logger.getInstance().info(`OrderFacade: Refunding order ${order.id}`);
    this.stateContext.advance('refund');
    return this.commandInvoker.executeCommand(new RefundOrderCommand(), order);
  }

  async advanceOrder(order: Order, action: string = 'confirm'): Promise<Order> {
    Logger.getInstance().info(`OrderFacade: Advancing order ${order.id} with action '${action}'`);
    this.stateContext.advance(action);
    return { ...order, status: this.stateContext.getState().name as OrderStatus, updatedAt: new Date() };
  }

  getOrderState(): string {
    return this.stateContext.getState().name;
  }

  getAvailableActions(): string[] {
    return this.stateContext.getAvailableActions();
  }
}
