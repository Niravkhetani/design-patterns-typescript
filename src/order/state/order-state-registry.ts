import { OrderState } from './order-state.interface';
import { PendingState } from './pending.state';
import { ConfirmedState } from './confirmed.state';
import { ProcessingState } from './processing.state';
import { ShippedState } from './shipped.state';
import { DeliveredState } from './delivered.state';
import { CancelledState } from './cancelled.state';
import { RefundedState } from './refunded.state';

const ORDER_STATE_TRANSITIONS: Record<string, Record<string, () => OrderState>> = {
  PENDING: {
    confirm: () => new ConfirmedState(),
    cancel: () => new CancelledState(),
  },
  CONFIRMED: {
    process: () => new ProcessingState(),
    cancel: () => new CancelledState(),
    refund: () => new RefundedState(),
    revert: () => new PendingState(),
  },
  PROCESSING: {
    ship: () => new ShippedState(),
    cancel: () => new CancelledState(),
    revert: () => new ConfirmedState(),
  },
  SHIPPED: {
    deliver: () => new DeliveredState(),
    revert: () => new ProcessingState(),
  },
  DELIVERED: {
    refund: () => new RefundedState(),
    revert: () => new ShippedState(),
  },
  CANCELLED: {
    refund: () => new RefundedState(),
  },
  REFUNDED: {},
};

export class OrderStateRegistry {
  static getInitialState(): OrderState {
    return new PendingState();
  }

  static transition(currentState: OrderState, action: string): OrderState {
    const transitions = ORDER_STATE_TRANSITIONS[currentState.name];
    if (!transitions || !transitions[action]) {
      throw new Error(`No transition found from ${currentState.name} with action '${action}'`);
    }
    const nextState = transitions[action]();
    if (!currentState.canTransitionTo(nextState.name)) {
      throw new Error(`State ${currentState.name} cannot transition to ${nextState.name}`);
    }
    return nextState;
  }

  static getAvailableActions(state: OrderState): string[] {
    const transitions = ORDER_STATE_TRANSITIONS[state.name] || {};
    return Object.keys(transitions).filter(action => {
      const next = transitions[action]();
      return state.canTransitionTo(next.name);
    });
  }
}
