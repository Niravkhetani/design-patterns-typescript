import { OrderState } from './order-state.interface';

export class ShippedState implements OrderState {
  readonly name = 'SHIPPED';

  canTransitionTo(targetName: string): boolean {
    return ['PROCESSING', 'DELIVERED'].includes(targetName);
  }

  getAvailableActions(): string[] {
    return ['deliver'];
  }
}
