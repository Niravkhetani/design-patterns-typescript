import { Notification } from '../../common/interfaces';
import { NotificationSender } from './notification-sender';
import { Logger } from '../../infrastructure/singleton/logger';

export abstract class NotificationBridge {
  protected sender: NotificationSender;

  constructor(sender: NotificationSender) {
    this.sender = sender;
  }

  setSender(sender: NotificationSender): void {
    Logger.getInstance().info(`Bridge switching sender to: ${sender.constructor.name}`);
    this.sender = sender;
  }

  abstract send(notification: Omit<Notification, 'id' | 'sentAt'>): Promise<boolean>;
}

export class OrderNotificationBridge extends NotificationBridge {
  async send(notification: Omit<Notification, 'id' | 'sentAt'>): Promise<boolean> {
    Logger.getInstance().info(`[OrderNotificationBridge] Preparing order notification`);
    const full: Notification = {
      ...notification,
      id: `notif_${Date.now()}`,
    };
    return this.sender.send(full);
  }
}

export class PromoNotificationBridge extends NotificationBridge {
  async send(notification: Omit<Notification, 'id' | 'sentAt'>): Promise<boolean> {
    Logger.getInstance().info(`[PromoNotificationBridge] Preparing promotional notification`);
    const full: Notification = {
      ...notification,
      id: `promo_${Date.now()}`,
    };
    return this.sender.send(full);
  }
}
