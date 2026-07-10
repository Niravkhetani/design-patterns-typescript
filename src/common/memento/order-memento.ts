import { Order, OrderItem, Address } from '../interfaces';
import { OrderStatus, PaymentMethod, PaymentStatus } from '../enums';

export class OrderMemento {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly items: OrderItem[],
    public readonly status: OrderStatus,
    public readonly totalAmount: number,
    public readonly currency: string,
    public readonly shippingAddress: Address,
    public readonly paymentMethod: PaymentMethod,
    public readonly paymentStatus: PaymentStatus,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
    public readonly snapshotTimestamp: Date
  ) {}

  toOrder(): Order {
    return {
      id: this.id,
      userId: this.userId,
      items: [...this.items],
      status: this.status,
      totalAmount: this.totalAmount,
      currency: this.currency,
      shippingAddress: { ...this.shippingAddress },
      paymentMethod: this.paymentMethod,
      paymentStatus: this.paymentStatus,
      createdAt: new Date(this.createdAt),
      updatedAt: new Date(this.updatedAt),
    };
  }
}

export class OrderCaretaker {
  private snapshots: OrderMemento[] = [];

  save(memento: OrderMemento): void {
    this.snapshots.push(memento);
  }

  restore(): OrderMemento | null {
    return this.snapshots.pop() || null;
  }

  getHistory(): ReadonlyArray<OrderMemento> {
    return [...this.snapshots];
  }
}

export class OrderOriginator {
  createSnapshot(order: Order): OrderMemento {
    return new OrderMemento(
      order.id,
      order.userId,
      [...order.items],
      order.status,
      order.totalAmount,
      order.currency,
      { ...order.shippingAddress },
      order.paymentMethod,
      order.paymentStatus,
      new Date(order.createdAt),
      new Date(order.updatedAt),
      new Date()
    );
  }
}
