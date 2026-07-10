import { NotificationChannel } from '../../common/enums';

export interface NotificationEvent {
  channel: NotificationChannel;
  recipient: string;
  subject: string;
  body: string;
  data: Record<string, unknown>;
}

export interface NotificationObserver {
  readonly name: string;
  update(event: NotificationEvent): Promise<void>;
}
