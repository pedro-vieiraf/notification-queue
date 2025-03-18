import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationDto } from './dto/notification.dto';

@Processor('notification', { concurrency: 5 })
export class NotificationProcessor extends WorkerHost {
  async process(job: Job) {
    const { type, recipient, message } = job.data as NotificationDto;

    switch (type) {
      case 'email':
        console.log(`Sending EMAIL to ${recipient}: ${message}`);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        break;

      case 'sms':
        console.log(`Sending SMS to ${recipient}: ${message}`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        break;

      default:
        console.log(`Unknown notification type: ${type}`);
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Notification job ${job.id} COMPLETED`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log(`Notification job ${job.id} FAILED`);
  }
}
