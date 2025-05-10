import {
  QueueEventsListener,
  OnQueueEvent,
  QueueEventsHost,
} from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';

@QueueEventsListener('notification')
export class NotificationEventsListener extends QueueEventsHost {
  private logger = new Logger('NotificationQueue');

  @OnQueueEvent('added')
  onAdded(job: { jobId: string; name: string }) {
    this.logger.log(`Notification job ${job.jobId} added to queue`);
  }
}
