import { OrderState } from './order-state.interface';

export class ProcessingState implements OrderState {
  readonly name = 'PROCESSING';

  canTransitionTo(targetName: string): boolean {
    return ['CONFIRMED', 'SHIPPED', 'CANCELLED'].includes(targetName);
  }

  getAvailableActions(): string[] {
    return ['ship', 'cancel'];
  }
}
