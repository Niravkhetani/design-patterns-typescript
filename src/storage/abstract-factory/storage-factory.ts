import { StorageProvider } from '../../common/enums';
import { Product, Order, User } from '../../common/interfaces';

export interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  findAll(filter?: Partial<Product>): Promise<Product[]>;
  save(product: Product): Promise<Product>;
  delete(id: string): Promise<boolean>;
}

export interface OrderRepository {
  findById(id: string): Promise<Order | null>;
  findAllByUser(userId: string): Promise<Order[]>;
  save(order: Order): Promise<Order>;
  updateStatus(id: string, status: string): Promise<Order>;
}

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  save(user: User): Promise<User>;
}

export interface StorageFactory {
  createProductRepository(): ProductRepository;
  createOrderRepository(): OrderRepository;
  createUserRepository(): UserRepository;
}
