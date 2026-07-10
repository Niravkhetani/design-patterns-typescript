import { Product, Order, User } from '../../common/interfaces';
import { ProductRepository, OrderRepository, UserRepository, StorageFactory } from '../abstract-factory/storage-factory';
import { Logger } from '../../infrastructure/singleton/logger';

class MongoProductRepository implements ProductRepository {
  async findById(id: string): Promise<Product | null> {
    Logger.getInstance().info(`[MongoDB] Finding product ${id}`);
    return null;
  }

  async findAll(_filter?: Partial<Product>): Promise<Product[]> {
    Logger.getInstance().info('[MongoDB] Finding all products');
    return [];
  }

  async save(product: Product): Promise<Product> {
    Logger.getInstance().info(`[MongoDB] Saving product ${product.id}`);
    return product;
  }

  async delete(id: string): Promise<boolean> {
    Logger.getInstance().info(`[MongoDB] Deleting product ${id}`);
    return true;
  }
}

class MongoOrderRepository implements OrderRepository {
  async findById(id: string): Promise<Order | null> {
    Logger.getInstance().info(`[MongoDB] Finding order ${id}`);
    return null;
  }

  async findAllByUser(userId: string): Promise<Order[]> {
    Logger.getInstance().info(`[MongoDB] Finding orders for user ${userId}`);
    return [];
  }

  async save(order: Order): Promise<Order> {
    Logger.getInstance().info(`[MongoDB] Saving order ${order.id}`);
    return order;
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    Logger.getInstance().info(`[MongoDB] Updating order ${id} status to ${status}`);
    throw new Error('Not implemented');
  }
}

class MongoUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    Logger.getInstance().info(`[MongoDB] Finding user ${id}`);
    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    Logger.getInstance().info(`[MongoDB] Finding user by email ${email}`);
    return null;
  }

  async save(user: User): Promise<User> {
    Logger.getInstance().info(`[MongoDB] Saving user ${user.id}`);
    return user;
  }
}

export class MongoStorageFactory implements StorageFactory {
  createProductRepository(): ProductRepository {
    return new MongoProductRepository();
  }

  createOrderRepository(): OrderRepository {
    return new MongoOrderRepository();
  }

  createUserRepository(): UserRepository {
    return new MongoUserRepository();
  }
}
