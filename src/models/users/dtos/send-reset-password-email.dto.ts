import { IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendForgottenPasswordEmailDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}
