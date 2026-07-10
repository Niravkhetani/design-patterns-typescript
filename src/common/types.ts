import { Product, User, Order, Category } from './interfaces';

export type Money = {
  amount: number;
  currency: string;
};

export type Discount = {
  percentage: number;
  code: string;
  expiresAt: Date;
};

export type ShippingMethod = 'STANDARD' | 'EXPRESS' | 'OVERNIGHT';

export type CatalogEntry = Product | Category;

export type ActionResult<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type PaginatedResult<T> = {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

export type OrderSummary = Pick<Order, 'id' | 'status' | 'totalAmount' | 'createdAt'>;

export type UserProfile = Pick<User, 'id' | 'email' | 'name' | 'role'>;

export type ProductFilter = {
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  inStock?: boolean;
};
