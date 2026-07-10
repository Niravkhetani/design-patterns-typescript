import { Order } from '../../common/interfaces';
import { OrderCommand } from './order-command.interface';
import { Logger } from '../../infrastructure/singleton/logger';

export class OrderCommandInvoker {
  private history: { command: OrderCommand; order: Order }[] = [];

  async executeCommand(command: OrderCommand, order: Order): Promise<Order> {
    Logger.getInstance().info(`Invoker executing command: ${command.name}`);
    const result = await command.execute(order);
    this.history.push({ command, order: result });
    return result;
  }

  async undoLast(): Promise<Order | null> {
    const last = this.history.pop();
    if (!last) return null;
    Logger.getInstance().info(`Invoker undoing command: ${last.command.name}`);
    return last.command.undo(last.order);
  }

  getHistory(): { command: OrderCommand; order: Order }[] {
    return [...this.history];
  }
}
