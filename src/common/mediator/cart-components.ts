import { MediatorComponent, MediatorEvent, CartMediator } from './cart-mediator';
import { Logger } from '../../infrastructure/singleton/logger';

export class InventoryComponent implements MediatorComponent {
  async receive(event: MediatorEvent): Promise<void> {
    Logger.getInstance().info(`[Inventory] Received event: ${event.type}`);
    if (event.type === 'checkout.completed') {
      Logger.getInstance().info(`[Inventory] Reserving stock for order ${event.data.orderId}`);
    }
  }
}

export class ShippingComponent implements MediatorComponent {
  async receive(event: MediatorEvent): Promise<void> {
    Logger.getInstance().info(`[Shipping] Received event: ${event.type}`);
    if (event.type === 'checkout.completed') {
      Logger.getInstance().info(`[Shipping] Creating shipment for order ${event.data.orderId}`);
    }
  }
}

export class BillingComponent implements MediatorComponent {
  async receive(event: MediatorEvent): Promise<void> {
    Logger.getInstance().info(`[Billing] Received event: ${event.type}`);
    if (event.type === 'payment.completed') {
      Logger.getInstance().info(`[Billing] Invoice generated for order ${event.data.orderId}`);
    }
  }
}

export function registerCheckoutComponents(): void {
  const mediator = CartMediator.getInstance();
  mediator.register('checkout.completed', new InventoryComponent());
  mediator.register('checkout.completed', new ShippingComponent());
  mediator.register('payment.completed', new BillingComponent());
}
