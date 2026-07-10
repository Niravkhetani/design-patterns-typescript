import { OrderState } from './order-state.interface';

export class PendingState implements OrderState {
  readonly name = 'PENDING';

  canTransitionTo(targetName: string): boolean {
    return ['CONFIRMED', 'CANCELLED'].includes(targetName);
  }

  getAvailableActions(): string[] {
    return ['confirm', 'cancel'];
  }
}
