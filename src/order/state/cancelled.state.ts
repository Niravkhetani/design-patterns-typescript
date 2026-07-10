import { OrderState } from './order-state.interface';

export class CancelledState implements OrderState {
  readonly name = 'CANCELLED';

  canTransitionTo(targetName: string): boolean {
    return ['REFUNDED'].includes(targetName);
  }

  getAvailableActions(): string[] {
    return ['refund'];
  }
}
