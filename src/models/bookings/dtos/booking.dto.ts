import { Expose, Type } from 'class-transformer';
import { CarDto } from 'src/models/cars/dtos/car.dto';
import { UserDto } from 'src/models/users/dtos/user.dto';

export class BookingDto {
  constructor(partial: Partial<BookingDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  startAt: Date;

  @Expose()
  endAt: Date;

  @Expose()
  totalPrice: number;

  @Expose()
  @Type(() => UserDto)
  user: UserDto;

  @Expose()
  @Type(() => CarDto)
  car: CarDto;

  @Expose()
  createdAt: Date;

  @Expose()
  createdBy: string;

  @Expose()
  updatedAt: Date;

  @Expose()
  updatedBy: string;
}
