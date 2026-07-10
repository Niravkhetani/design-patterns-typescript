import { Notification } from '../../common/interfaces';
import { NotificationSender } from './notification-sender';
import { Logger } from '../../infrastructure/singleton/logger';

export class SmsSender implements NotificationSender {
  async send(notification: Notification): Promise<boolean> {
    Logger.getInstance().info(`[SmsSender] Sending SMS to ${notification.recipient}`);
    Logger.getInstance().info(`[SmsSender] Message: ${notification.body.substring(0, 160)}`);
    return true;
  }
}
