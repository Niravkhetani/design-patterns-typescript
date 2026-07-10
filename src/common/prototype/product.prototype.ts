import { Product } from '../interfaces';

export interface Prototype<T> {
  clone(): T;
}

export class ProductPrototype implements Prototype<Product> {
  constructor(private product: Product) {}

  clone(): Product {
    return {
      ...this.product,
      id: `${this.product.id}_clone_${Date.now()}`,
      sku: `${this.product.sku}-CLONE`,
      name: `${this.product.name} (Copy)`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  cloneWithOverrides(overrides: Partial<Product>): Product {
    return {
      ...this.clone(),
      ...overrides,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
}
