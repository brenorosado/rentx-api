import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { UpdateCarDto } from 'src/models/cars/dtos/update-car.dto';
import { UpdateUserDto } from 'src/models/users/dtos/update-user.dto';

export class UpdateBookingDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  startAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  endAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsInt()
  totalPrice: number;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateCarDto)
  car: UpdateCarDto;

  @ApiProperty()
  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateUserDto)
  user: UpdateUserDto;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  createdAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  createdBy: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  updatedAt: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  updatedBy: string;
}
