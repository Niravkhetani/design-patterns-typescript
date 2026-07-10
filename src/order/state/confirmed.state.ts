import { OrderState } from './order-state.interface';

export class ConfirmedState implements OrderState {
  readonly name = 'CONFIRMED';

  canTransitionTo(targetName: string): boolean {
    return ['PENDING', 'PROCESSING', 'CANCELLED', 'REFUNDED'].includes(targetName);
  }

  getAvailableActions(): string[] {
    return ['process', 'cancel', 'refund'];
  }
}
