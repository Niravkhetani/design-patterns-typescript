import { Product, Order, User } from '../../common/interfaces';
import { ProductRepository, OrderRepository, UserRepository, StorageFactory } from '../abstract-factory/storage-factory';
import { Logger } from '../../infrastructure/singleton/logger';

class RedisProductRepository implements ProductRepository {
  async findById(id: string): Promise<Product | null> {
    Logger.getInstance().info(`[Redis] Cached product ${id}`);
    return null;
  }

  async findAll(_filter?: Partial<Product>): Promise<Product[]> {
    Logger.getInstance().info('[Redis] Finding all cached products');
    return [];
  }

  async save(product: Product): Promise<Product> {
    Logger.getInstance().info(`[Redis] Caching product ${product.id}`);
    return product;
  }

  async delete(id: string): Promise<boolean> {
    Logger.getInstance().info(`[Redis] Evicting product ${id}`);
    return true;
  }
}

class RedisOrderRepository implements OrderRepository {
  async findById(id: string): Promise<Order | null> {
    Logger.getInstance().info(`[Redis] Cached order ${id}`);
    return null;
  }

  async findAllByUser(userId: string): Promise<Order[]> {
    Logger.getInstance().info(`[Redis] Cached orders for user ${userId}`);
    return [];
  }

  async save(order: Order): Promise<Order> {
    Logger.getInstance().info(`[Redis] Caching order ${order.id}`);
    return order;
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    Logger.getInstance().info(`[Redis] Updating cached order ${id} status to ${status}`);
    throw new Error('Not implemented');
  }
}

class RedisUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    Logger.getInstance().info(`[Redis] Cached user ${id}`);
    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    Logger.getInstance().info(`[Redis] Cached user by email ${email}`);
    return null;
  }

  async save(user: User): Promise<User> {
    Logger.getInstance().info(`[Redis] Caching user ${user.id}`);
    return user;
  }
}

export class RedisStorageFactory implements StorageFactory {
  createProductRepository(): ProductRepository {
    return new RedisProductRepository();
  }

  createOrderRepository(): OrderRepository {
    return new RedisOrderRepository();
  }

  createUserRepository(): UserRepository {
    return new RedisUserRepository();
  }
}
