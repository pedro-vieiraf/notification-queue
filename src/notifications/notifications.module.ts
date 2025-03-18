import { Module } from '@nestjs/common';
import { NotificationController } from './notifications.controller';
import { BullModule } from '@nestjs/bullmq';
import { NotificationProcessor } from './notification.processor';
import { NotificationEventsListener } from './notification.events';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'notification',
    }),
  ],
  controllers: [NotificationController],
  providers: [NotificationProcessor, NotificationEventsListener],
})
export class NotificationsModule {}
