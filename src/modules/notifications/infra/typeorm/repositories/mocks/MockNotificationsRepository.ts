import { ObjectID } from 'mongodb';

import Notification from '@modules/notifications/infra/typeorm/schemas/Notification';

import ICreateNotificationDTO from '@modules/notifications/dtos/ICreateNotificationDTO';
import INotificationRepository from '@modules/notifications/repositories/INotificationsRepository';

class MockNotificationsRepository implements INotificationRepository {
  private notifications: Notification[] = [];

  public async create({ content, recipient_id }: ICreateNotificationDTO): Promise<Notification> {
    const notification = Object.assign(new Notification(), {
      id: new ObjectID(),
      content,
      recipient_id
    });

    this.notifications.push(notification);

    return notification;
  }
}

export default MockNotificationsRepository;
