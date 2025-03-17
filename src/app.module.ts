import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'redis',
        port: 6379,
      },
      defaultJobOptions: {
        attempts: 3,
        removeOnComplete: 1000,
        removeOnFail: 3000,
        backoff: 2000,
      },
    }),
    VideoModule,
  ],
})
export class AppModule {}
