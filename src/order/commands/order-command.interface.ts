import { Order } from '../../common/interfaces';

export interface OrderCommand {
  readonly name: string;
  execute(order: Order): Promise<Order>;
  undo(order: Order): Promise<Order>;
}
