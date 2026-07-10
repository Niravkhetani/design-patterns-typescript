import { NotificationObserver, NotificationEvent } from '../observer/notification-event';
import { Logger } from '../../infrastructure/singleton/logger';

export class PushObserver implements NotificationObserver {
  readonly name = 'PushObserver';

  async update(event: NotificationEvent): Promise<void> {
    Logger.getInstance().info(`[PUSH] Device: ${event.recipient}, Title: ${event.subject}`);
  }
}
