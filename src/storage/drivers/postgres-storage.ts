import { Product, Order, User } from '../../common/interfaces';
import { ProductRepository, OrderRepository, UserRepository, StorageFactory } from '../abstract-factory/storage-factory';
import { Logger } from '../../infrastructure/singleton/logger';

class PostgresProductRepository implements ProductRepository {
  async findById(id: string): Promise<Product | null> {
    Logger.getInstance().info(`[Postgres] Finding product ${id}`);
    return null;
  }

  async findAll(_filter?: Partial<Product>): Promise<Product[]> {
    Logger.getInstance().info('[Postgres] Finding all products');
    return [];
  }

  async save(product: Product): Promise<Product> {
    Logger.getInstance().info(`[Postgres] Saving product ${product.id}`);
    return product;
  }

  async delete(id: string): Promise<boolean> {
    Logger.getInstance().info(`[Postgres] Deleting product ${id}`);
    return true;
  }
}

class PostgresOrderRepository implements OrderRepository {
  async findById(id: string): Promise<Order | null> {
    Logger.getInstance().info(`[Postgres] Finding order ${id}`);
    return null;
  }

  async findAllByUser(userId: string): Promise<Order[]> {
    Logger.getInstance().info(`[Postgres] Finding orders for user ${userId}`);
    return [];
  }

  async save(order: Order): Promise<Order> {
    Logger.getInstance().info(`[Postgres] Saving order ${order.id}`);
    return order;
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    Logger.getInstance().info(`[Postgres] Updating order ${id} status to ${status}`);
    throw new Error('Not implemented');
  }
}

class PostgresUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    Logger.getInstance().info(`[Postgres] Finding user ${id}`);
    return null;
  }

  async findByEmail(email: string): Promise<User | null> {
    Logger.getInstance().info(`[Postgres] Finding user by email ${email}`);
    return null;
  }

  async save(user: User): Promise<User> {
    Logger.getInstance().info(`[Postgres] Saving user ${user.id}`);
    return user;
  }
}

export class PostgresStorageFactory implements StorageFactory {
  createProductRepository(): ProductRepository {
    return new PostgresProductRepository();
  }

  createOrderRepository(): OrderRepository {
    return new PostgresOrderRepository();
  }

  createUserRepository(): UserRepository {
    return new PostgresUserRepository();
  }
}
