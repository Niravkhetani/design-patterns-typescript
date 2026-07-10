import { StorageProvider } from '../../common/enums';
import { Logger } from './logger';

export class ConfigManager {
  private static instance: ConfigManager;
  private config: Map<string, unknown> = new Map();

  private constructor() {
    this.config.set('app.name', 'ECommercePlatform');
    this.config.set('app.version', '1.0.0');
    this.config.set('app.environment', process.env.NODE_ENV || 'development');
    this.config.set('storage.defaultProvider', StorageProvider.POSTGRES);
    this.config.set('auth.tokenExpiryMs', 3600000);
    this.config.set('auth.refreshExpiryMs', 86400000);
    this.config.set('payment.currency', 'USD');
    this.config.set('catalog.maxPageSize', 100);
    Logger.getInstance().info('ConfigManager initialized with default configuration');
  }

  static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  get<T>(key: string): T | undefined {
    return this.config.get(key) as T | undefined;
  }

  set<T>(key: string, value: T): void {
    Logger.getInstance().info(`Config updated: ${key} = ${String(value)}`);
    this.config.set(key, value);
  }
}
