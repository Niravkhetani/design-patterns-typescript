import { OrderState } from './order-state.interface';
import { OrderStateRegistry } from './order-state-registry';
import { Logger } from '../../infrastructure/singleton/logger';

export class OrderContext {
  private state: OrderState;

  constructor() {
    this.state = OrderStateRegistry.getInitialState();
  }

  getState(): OrderState {
    return this.state;
  }

  setState(state: OrderState): void {
    Logger.getInstance().info(`Order state transition: ${this.state.name} -> ${state.name}`);
    this.state = state;
  }

  advance(action: string = 'confirm'): void {
    const nextState = OrderStateRegistry.transition(this.state, action);
    this.setState(nextState);
  }

  getAvailableActions(): string[] {
    return OrderStateRegistry.getAvailableActions(this.state);
  }
}
