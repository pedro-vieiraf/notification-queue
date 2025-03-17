import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

@Processor('video', { concurrency: 2 })
export class VideoProcessor extends WorkerHost {
  async process(job: Job) {
    switch (job.name) {
      case 'compress':
        console.log('Starting compress task');

        await new Promise((resolve) => setTimeout(resolve, 10000));

        break;

      case 'process':
        console.log('Starting process taks');

        await new Promise((resolve) => setTimeout(resolve, 5000));

        break;
    }
  }

  @OnWorkerEvent('active')
  onAdded(job: Job) {
    console.log(`Got a new job, ${job.id}`);
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(`Job with id ${job.id} COMPLETED!`);
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log(`JOb with id ${job.id} FAILED!`);
    console.log(`Attempt Number ${job.attemptsMade}`);
  }
}
