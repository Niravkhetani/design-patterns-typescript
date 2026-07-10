import { OrderState } from './order-state.interface';

export class DeliveredState implements OrderState {
  readonly name = 'DELIVERED';

  canTransitionTo(targetName: string): boolean {
    return ['SHIPPED', 'REFUNDED'].includes(targetName);
  }

  getAvailableActions(): string[] {
    return ['refund'];
  }
}
