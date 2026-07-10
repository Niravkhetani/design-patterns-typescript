import { Order } from '../../common/interfaces';
import { OrderCommand } from './order-command.interface';
import { OrderStatus, PaymentStatus } from '../../common/enums';
import { Logger } from '../../infrastructure/singleton/logger';

export class RefundOrderCommand implements OrderCommand {
  readonly name = 'RefundOrder';

  async execute(order: Order): Promise<Order> {
    Logger.getInstance().info(`Executing RefundOrder for order ${order.id}`);
    return {
      ...order,
      status: OrderStatus.REFUNDED,
      paymentStatus: PaymentStatus.REFUNDED,
      updatedAt: new Date(),
    };
  }

  async undo(order: Order): Promise<Order> {
    Logger.getInstance().info(`Undoing RefundOrder for order ${order.id}`);
    return {
      ...order,
      status: OrderStatus.DELIVERED,
      paymentStatus: PaymentStatus.COMPLETED,
      updatedAt: new Date(),
    };
  }
}
