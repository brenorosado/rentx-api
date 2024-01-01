import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsInt, ValidateNested } from 'class-validator';
import { UpdateCarDto } from 'src/models/cars/dtos/update-car.dto';
import { UpdateUserDto } from 'src/models/users/dtos/update-user.dto';

export class CreateBookingDto {
  @ApiProperty()
  @IsDateString()
  startAt: Date;

  @ApiProperty()
  @IsDateString()
  endAt: Date;

  @ApiProperty()
  @IsInt()
  totalPrice: number;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateCarDto)
  car: UpdateCarDto;

  @ApiProperty()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  user: UpdateUserDto;
}
