import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { FuelType } from '../enums/fuel-type.enum';
import { GearType } from '../enums/gear-type.enum';

export class UpdateCarDto {
  @ApiProperty({ required: true })
  @IsString()
  id: string;

  @ApiProperty({ required: false })
  @IsString()
  make: string;

  @ApiProperty({ required: false })
  @IsString()
  model: string;

  @ApiProperty({ required: false })
  @IsInt()
  pricePerDay: number;

  @ApiProperty({ required: false })
  @IsInt()
  maxKmPerHour: number;

  @ApiProperty({ required: false })
  @IsNumber()
  timeToAHundredKmPerHour: number;

  @ApiProperty({ required: false })
  @IsEnum(FuelType)
  fuelType: keyof typeof FuelType;

  @ApiProperty({ required: false })
  @IsEnum(GearType)
  gearType: keyof typeof GearType;

  @ApiProperty({ required: false })
  @IsInt()
  maxPeopleCapacity: number;

  @ApiProperty({ required: false })
  @IsInt()
  horsepower: number;

  @ApiProperty({ required: false })
  @IsString()
  description: string;
}
