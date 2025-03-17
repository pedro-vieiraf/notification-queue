import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { VideoController } from './video.controller';
import { VideoProcessor } from './video.worker';
import { VideoQueueEventsListener } from './video-queue.events';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'video',
    }),
  ],
  controllers: [VideoController],
  providers: [VideoProcessor, VideoQueueEventsListener],
})
export class VideoModule {}
