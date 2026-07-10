import {
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  UserRole,
  ReportType,
  NotificationType,
  NotificationChannel,
  StorageProvider,
} from './enums';

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  categoryId: string;
  attributes: Record<string, string>;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  currency: string;
  shippingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PaymentDetails {
  id: string;
  orderId: string;
  method: PaymentMethod;
  amount: number;
  currency: string;
  status: PaymentStatus;
  transactionId?: string;
  metadata: Record<string, string>;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  parentId: string | null;
  children: Category[];
  products: Product[];
}

export interface Cart {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Notification {
  id: string;
  type: NotificationType;
  channel: NotificationChannel;
  recipient: string;
  subject: string;
  body: string;
  sentAt?: Date;
}

export interface Request {
  id: string;
  userId: string;
  ip?: string;
  method: string;
  path: string;
  headers: Record<string, string>;
  body: unknown;
  timestamp: Date;
}

export interface Response {
  statusCode: number;
  headers: Record<string, string>;
  body: unknown;
}

export interface Report {
  type: ReportType;
  title: string;
  generatedAt: Date;
  data: unknown[];
  summary: Record<string, unknown>;
}

export interface StorageConfig {
  provider: StorageProvider;
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
  options: Record<string, unknown>;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresAt: Date;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface Session {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
}
