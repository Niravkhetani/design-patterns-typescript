import { NotificationObserver, NotificationEvent } from '../observer/notification-event';
import { Logger } from '../../infrastructure/singleton/logger';

export class EmailObserver implements NotificationObserver {
  readonly name = 'EmailObserver';

  async update(event: NotificationEvent): Promise<void> {
    Logger.getInstance().info(`[EMAIL] To: ${event.recipient}, Subject: ${event.subject}`);
    Logger.getInstance().info(`[EMAIL] Body: ${event.body}`);
  }
}
