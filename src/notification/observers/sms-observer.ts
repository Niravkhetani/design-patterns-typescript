import { NotificationObserver, NotificationEvent } from '../observer/notification-event';
import { Logger } from '../../infrastructure/singleton/logger';

export class SmsObserver implements NotificationObserver {
  readonly name = 'SmsObserver';

  async update(event: NotificationEvent): Promise<void> {
    Logger.getInstance().info(`[SMS] To: ${event.recipient}, Message: ${event.body.substring(0, 100)}`);
  }
}
