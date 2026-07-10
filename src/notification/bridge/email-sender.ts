import { Notification } from '../../common/interfaces';
import { NotificationSender } from './notification-sender';
import { Logger } from '../../infrastructure/singleton/logger';

export class EmailSender implements NotificationSender {
  async send(notification: Notification): Promise<boolean> {
    Logger.getInstance().info(`[EmailSender] Sending email to ${notification.recipient}`);
    Logger.getInstance().info(`[EmailSender] Subject: ${notification.subject}`);
    Logger.getInstance().info(`[EmailSender] Body: ${notification.body}`);
    return true;
  }
}
