import { Product, Order, User } from '../interfaces';
import { Logger } from '../../infrastructure/singleton/logger';

export interface Visitable<T> {
  accept(visitor: Visitor<T>): T;
}

export interface Visitor<T> {
  visitProduct(product: Product): T;
  visitOrder(order: Order): T;
  visitUser(user: User): T;
}

export class ReportVisitor implements Visitor<Record<string, unknown>> {
  visitProduct(product: Product): Record<string, unknown> {
    Logger.getInstance().info(`[Visitor] Reporting on product: ${product.name}`);
    return {
      type: 'PRODUCT',
      name: product.name,
      price: product.price,
      stock: product.stock,
      needsReorder: product.stock < 10,
    };
  }

  visitOrder(order: Order): Record<string, unknown> {
    Logger.getInstance().info(`[Visitor] Reporting on order: ${order.id}`);
    return {
      type: 'ORDER',
      orderId: order.id,
      status: order.status,
      totalAmount: order.totalAmount,
      itemCount: order.items.length,
      isFulfilled: order.status === 'DELIVERED',
    };
  }

  visitUser(user: User): Record<string, unknown> {
    Logger.getInstance().info(`[Visitor] Reporting on user: ${user.name}`);
    return {
      type: 'USER',
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}

export class DiscountVisitor implements Visitor<number> {
  visitProduct(product: Product): number {
    if (product.stock > 100) {
      return product.price * 0.1;
    }
    return 0;
  }

  visitOrder(order: Order): number {
    if (order.totalAmount > 500) {
      return order.totalAmount * 0.15;
    }
    if (order.totalAmount > 100) {
      return order.totalAmount * 0.05;
    }
    return 0;
  }

  visitUser(_user: User): number {
    return 0;
  }
}
