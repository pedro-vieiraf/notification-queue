import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class NotificationService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(to: string, subject: string, message: string) {
    await this.mailerService.sendMail({
      to,
      subject,
      text: message,
      // html: `<b>${message}</b>` // Se quiser enviar como HTML
    });
  }
}
