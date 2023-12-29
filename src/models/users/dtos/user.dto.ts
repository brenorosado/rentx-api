import { Expose } from 'class-transformer';

export class UserDto {
  @Expose()
  id: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  cnh: string;

  @Expose()
  createdAt: string;

  @Expose()
  createdBy: string;

  @Expose()
  updatedAt: string;

  @Expose()
  updatedBy: string;
}
