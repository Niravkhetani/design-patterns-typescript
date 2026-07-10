import { Order } from '../../common/interfaces';
import { OrderCommand } from './order-command.interface';
import { OrderStatus } from '../../common/enums';
import { Logger } from '../../infrastructure/singleton/logger';

export class CancelOrderCommand implements OrderCommand {
  readonly name = 'CancelOrder';

  async execute(order: Order): Promise<Order> {
    Logger.getInstance().info(`Executing CancelOrder for order ${order.id}`);
    return {
      ...order,
      status: OrderStatus.CANCELLED,
      updatedAt: new Date(),
    };
  }

  async undo(order: Order): Promise<Order> {
    Logger.getInstance().info(`Undoing CancelOrder for order ${order.id}`);
    return {
      ...order,
      status: OrderStatus.PENDING,
      updatedAt: new Date(),
    };
  }
}
