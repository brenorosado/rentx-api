import { Expose, Type } from 'class-transformer';
import { User } from '@prisma/client';
import { UserDto } from '../../dtos/user.dto';

export class AuthenticationDto {
  constructor(partial: Partial<AuthenticationDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  @Type(() => UserDto)
  user: User;

  @Expose()
  token: string;
}
