import { Module } from '@nestjs/common';
import { NotificationController } from './notifications.controller';
import { BullModule } from '@nestjs/bullmq';
import { NotificationProcessor } from './notification.processor';
import { NotificationEventsListener } from './notification.events';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NotificationService } from './notifications.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    BullModule.registerQueue({
      name: 'notification',
      defaultJobOptions: {
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000,
        },
        // removeOnComplete: true,
        // removeOnFail: true,
      },
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('EMAIL_HOST'),
          port: configService.get<number>('EMAIL_PORT'),
          auth: {
            user: configService.get<string>('EMAIL_USER'),
            pass: configService.get<string>('EMAIL_PASS'),
          },
        },
      }),
    }),
  ],
  controllers: [NotificationController],
  providers: [
    NotificationProcessor,
    NotificationEventsListener,
    NotificationService,
  ],
})
export class NotificationsModule {}
