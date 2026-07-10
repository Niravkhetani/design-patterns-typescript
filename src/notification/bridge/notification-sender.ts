import { Notification } from '../../common/interfaces';

export interface NotificationSender {
  send(notification: Notification): Promise<boolean>;
}
