import { OnWorkerEvent, Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { NotificationDto } from './dto/notification.dto';
import { Inject } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Processor('notification', { concurrency: 5 })
export class NotificationProcessor extends WorkerHost {
  constructor(
    @Inject(MailerService) private readonly mailerService: MailerService,
  ) {
    super();
  }
  async process(job: Job) {
    const { type, recipient, message } = job.data as NotificationDto;

    if (!type || !recipient || !message) {
      throw new Error('Missing required fields in job data');
    }
    switch (type) {
      case 'email':
        console.log(`Sending EMAIL to ${recipient}: ${message}`);

        // Envio de e-mail usando o MailerService
        try {
          await this.mailerService.sendMail({
            to: recipient, // Destinatário
            subject: 'Notification', // Assunto
            text: message, // Corpo do email
            html: `
              <h1>Notificação Importante</h1>
              <p><strong>Olá, ${recipient}!</strong></p>
              <p>${message}.</p>`, // Corpo do email em HTML
          });
          console.log(`Email sent to ${recipient}`);
        } catch (error) {
          console.error(`Failed to send email to ${recipient}:`, error);
          throw new Error();
        }

        break;

      default:
        console.log(`Unknown notification type: ${type}`);
    }
  }

  @OnWorkerEvent('completed')
  onCompleted(job: Job) {
    console.log(
      `Notification job ${job.id} COMPLETED. Data: ${JSON.stringify(job.data)}`, // Dar mais detalhes na mensagem
    );
  }

  @OnWorkerEvent('failed')
  onFailed(job: Job) {
    console.log(
      `Notification job ${job.id} FAILED. Error: ${job.failedReason}`,
    );
  }
}
