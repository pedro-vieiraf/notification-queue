import { InjectQueue } from '@nestjs/bullmq';
import { Controller, Post, Body } from '@nestjs/common';
import { Queue } from 'bullmq';
import { CreateNotificationDto } from './dto/notification.dto';

@Controller('notification')
export class NotificationController {
  constructor(
    @InjectQueue('notification') private readonly notificationQueue: Queue,
  ) {}

  @Post('send')
  async sendNotification(@Body() body: CreateNotificationDto) {
    await this.notificationQueue.add('send', body);

    return {
      message: 'Notification job added to queue!',
    };
  }
}
