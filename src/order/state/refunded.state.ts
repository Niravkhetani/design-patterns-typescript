import { OrderState } from './order-state.interface';

export class RefundedState implements OrderState {
  readonly name = 'REFUNDED';

  canTransitionTo(_targetName: string): boolean {
    return false;
  }

  getAvailableActions(): string[] {
    return [];
  }
}
