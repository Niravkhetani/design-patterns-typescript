import { NotificationObserver, NotificationEvent } from './notification-event';
import { Logger } from '../../infrastructure/singleton/logger';

export class NotificationPublisher {
  private observers: Map<string, NotificationObserver[]> = new Map();

  subscribe(channel: string, observer: NotificationObserver): void {
    const existing = this.observers.get(channel) || [];
    existing.push(observer);
    this.observers.set(channel, existing);
    Logger.getInstance().info(`Observer ${observer.name} subscribed to channel: ${channel}`);
  }

  unsubscribe(channel: string, observer: NotificationObserver): void {
    const existing = this.observers.get(channel) || [];
    this.observers.set(
      channel,
      existing.filter(o => o.name !== observer.name)
    );
  }

  async notify(channel: string, event: NotificationEvent): Promise<void> {
    const subscribers = this.observers.get(channel) || [];
    Logger.getInstance().info(`Notifying ${subscribers.length} observers on channel: ${channel}`);
    await Promise.all(subscribers.map(observer => observer.update(event)));
  }
}
