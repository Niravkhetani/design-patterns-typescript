export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
}

export enum PaymentMethod {
  CREDIT_CARD = 'CREDIT_CARD',
  PAYPAL = 'PAYPAL',
  CRYPTO = 'CRYPTO',
  STRIPE = 'STRIPE',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
}

export enum AuthStrategyType {
  JWT = 'JWT',
  OAUTH = 'OAUTH',
  SESSION = 'SESSION',
}

export enum NotificationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PUSH = 'PUSH',
}

export enum NotificationChannel {
  ORDER_CONFIRMATION = 'ORDER_CONFIRMATION',
  PAYMENT_RECEIVED = 'PAYMENT_RECEIVED',
  SHIPPING_UPDATE = 'SHIPPING_UPDATE',
  PROMOTIONAL = 'PROMOTIONAL',
}

export enum StorageProvider {
  POSTGRES = 'POSTGRES',
  MONGODB = 'MONGODB',
  REDIS = 'REDIS',
}

export enum ReportType {
  SALES = 'SALES',
  INVENTORY = 'INVENTORY',
  USER = 'USER',
}

export enum UserRole {
  GUEST = 'GUEST',
  CUSTOMER = 'CUSTOMER',
  ADMIN = 'ADMIN',
}
