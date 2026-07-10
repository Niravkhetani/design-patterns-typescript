import { Product, Order, User } from '../../common/interfaces';
import { Logger } from '../singleton/logger';

export interface DataService {
  getProduct(id: string): Promise<Product>;
  getOrder(id: string): Promise<Order>;
  getUser(id: string): Promise<User>;
}

export class RealDataService implements DataService {
  async getProduct(id: string): Promise<Product> {
    return {
      id,
      sku: `SKU_${id}`,
      name: `Product ${id}`,
      description: `Description for product ${id}`,
      price: 29.99,
      currency: 'USD',
      categoryId: 'cat_1',
      attributes: {},
      stock: 100,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  async getOrder(id: string): Promise<Order> {
    throw new Error(`Order ${id} not found`);
  }

  async getUser(id: string): Promise<User> {
    throw new Error(`User ${id} not found`);
  }
}

export class CachingProxy implements DataService {
  private cache = new Map<string, unknown>();
  private realService: DataService;

  constructor(realService: DataService) {
    this.realService = realService;
  }

  async getProduct(id: string): Promise<Product> {
    const cacheKey = `product_${id}`;
    const cached = this.cache.get(cacheKey) as Product;
    if (cached) {
      Logger.getInstance().info(`[Cache HIT] Product ${id}`);
      return cached;
    }
    Logger.getInstance().info(`[Cache MISS] Product ${id}`);
    const product = await this.realService.getProduct(id);
    this.cache.set(cacheKey, product);
    return product;
  }

  async getOrder(id: string): Promise<Order> {
    const cacheKey = `order_${id}`;
    const cached = this.cache.get(cacheKey) as Order;
    if (cached) {
      Logger.getInstance().info(`[Cache HIT] Order ${id}`);
      return cached;
    }
    Logger.getInstance().info(`[Cache MISS] Order ${id}`);
    const order = await this.realService.getOrder(id);
    this.cache.set(cacheKey, order);
    return order;
  }

  async getUser(id: string): Promise<User> {
    const cacheKey = `user_${id}`;
    const cached = this.cache.get(cacheKey) as User;
    if (cached) {
      Logger.getInstance().info(`[Cache HIT] User ${id}`);
      return cached;
    }
    Logger.getInstance().info(`[Cache MISS] User ${id}`);
    const user = await this.realService.getUser(id);
    this.cache.set(cacheKey, user);
    return user;
  }

  clearCache(): void {
    this.cache.clear();
    Logger.getInstance().info('[Cache] Cleared');
  }
}

export class AccessControlProxy implements DataService {
  constructor(
    private realService: DataService,
    private userRole: string
  ) {}

  async getProduct(id: string): Promise<Product> {
    return this.realService.getProduct(id);
  }

  async getOrder(id: string): Promise<Order> {
    if (this.userRole !== 'ADMIN' && this.userRole !== 'CUSTOMER') {
      throw new Error('Access denied: insufficient permissions to view orders');
    }
    return this.realService.getOrder(id);
  }

  async getUser(id: string): Promise<User> {
    if (this.userRole !== 'ADMIN') {
      throw new Error('Access denied: only admins can view user data');
    }
    return this.realService.getUser(id);
  }
}
