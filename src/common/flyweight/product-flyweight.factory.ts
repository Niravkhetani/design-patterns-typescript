import { Logger } from '../../infrastructure/singleton/logger';

interface ProductSharedState {
  category: string;
  brand: string;
  supplier: string;
  warrantyMonths: number;
  returnPolicy: string;
}

export class ProductFlyweight {
  constructor(public readonly shared: ProductSharedState) {}

  display(uniqueState: Record<string, string>): string {
    return JSON.stringify({ shared: this.shared, unique: uniqueState });
  }
}

export class ProductFlyweightFactory {
  private flyweights: Map<string, ProductFlyweight> = new Map();

  private getKey(state: ProductSharedState): string {
    return `${state.category}|${state.brand}|${state.supplier}|${state.warrantyMonths}|${state.returnPolicy}`;
  }

  getFlyweight(state: ProductSharedState): ProductFlyweight {
    const key = this.getKey(state);
    if (!this.flyweights.has(key)) {
      Logger.getInstance().info(`[Flyweight] Creating new flyweight for: ${key}`);
      this.flyweights.set(key, new ProductFlyweight(state));
    } else {
      Logger.getInstance().info(`[Flyweight] Reusing flyweight: ${key}`);
    }
    return this.flyweights.get(key)!;
  }

  getTotalFlyweights(): number {
    return this.flyweights.size;
  }
}
