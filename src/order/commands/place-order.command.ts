import { Order, OrderItem } from '../../common/interfaces';
import { OrderCommand } from './order-command.interface';
import { OrderStatus, PaymentStatus } from '../../common/enums';
import { Logger } from '../../infrastructure/singleton/logger';

export class PlaceOrderCommand implements OrderCommand {
  readonly name = 'PlaceOrder';

  async execute(order: Order): Promise<Order> {
    Logger.getInstance().info(`Executing PlaceOrder for order ${order.id}`);
    return {
      ...order,
      status: OrderStatus.CONFIRMED,
      updatedAt: new Date(),
    };
  }

  async undo(order: Order): Promise<Order> {
    Logger.getInstance().info(`Undoing PlaceOrder for order ${order.id}`);
    return {
      ...order,
      status: OrderStatus.PENDING,
      updatedAt: new Date(),
    };
  }
}
