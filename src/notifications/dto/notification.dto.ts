import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class NotificationDto {
  type: string;
  recipient: string;
  message: string;
}

export class CreateNotificationDto {
  @IsString()
  @IsIn(['email', 'sms'])
  type: string;

  @IsString()
  @IsNotEmpty()
  recipient: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
