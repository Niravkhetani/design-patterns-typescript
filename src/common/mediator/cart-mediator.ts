import { Logger } from '../../infrastructure/singleton/logger';

export interface MediatorEvent {
  type: string;
  data: Record<string, unknown>;
}

export interface MediatorComponent {
  receive(event: MediatorEvent): Promise<void>;
}

export class CartMediator {
  private static instance: CartMediator;
  private components: Map<string, MediatorComponent[]> = new Map();

  private constructor() {}

  static getInstance(): CartMediator {
    if (!CartMediator.instance) {
      CartMediator.instance = new CartMediator();
    }
    return CartMediator.instance;
  }

  register(eventType: string, component: MediatorComponent): void {
    const existing = this.components.get(eventType) || [];
    existing.push(component);
    this.components.set(eventType, existing);
  }

  unregister(eventType: string, component: MediatorComponent): void {
    const existing = this.components.get(eventType) || [];
    this.components.set(
      eventType,
      existing.filter(c => c !== component)
    );
  }

  async notify(event: MediatorEvent): Promise<void> {
    Logger.getInstance().info(`[Mediator] Event: ${event.type}`);
    const subscribers = this.components.get(event.type) || [];
    await Promise.all(subscribers.map(c => c.receive(event)));
  }

  async onCartUpdated(cartId: string): Promise<void> {
    await this.notify({ type: 'cart.updated', data: { cartId } });
  }

  async onCheckoutCompleted(cartId: string, orderId: string): Promise<void> {
    await this.notify({ type: 'checkout.completed', data: { cartId, orderId } });
  }

  async onPaymentCompleted(orderId: string): Promise<void> {
    await this.notify({ type: 'payment.completed', data: { orderId } });
  }
}
