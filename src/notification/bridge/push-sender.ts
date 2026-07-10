import { Notification } from '../../common/interfaces';
import { NotificationSender } from './notification-sender';
import { Logger } from '../../infrastructure/singleton/logger';

export class PushSender implements NotificationSender {
  async send(notification: Notification): Promise<boolean> {
    Logger.getInstance().info(`[PushSender] Sending push notification to device ${notification.recipient}`);
    Logger.getInstance().info(`[PushSender] Title: ${notification.subject}`);
    return true;
  }
}
