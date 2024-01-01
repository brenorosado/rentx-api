import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsString } from 'class-validator';
import { FuelType } from '../enums/fuel-type.enum';
import { GearType } from '../enums/gear-type.enum';

export class CreateCarDto {
  @ApiProperty()
  @IsString()
  make: string;

  @ApiProperty()
  @IsString()
  model: string;

  @ApiProperty()
  @IsInt()
  pricePerDay: number;

  @ApiProperty()
  @IsInt()
  maxKmPerHour: number;

  @ApiProperty()
  @IsNumber()
  timeToAHundredKmPerHour: number;

  @ApiProperty({ enum: FuelType })
  @IsEnum(FuelType)
  fuelType: keyof typeof FuelType;

  @ApiProperty({ enum: GearType })
  @IsEnum(GearType)
  gearType: keyof typeof GearType;

  @ApiProperty()
  @IsInt()
  maxPeopleCapacity: number;

  @ApiProperty()
  @IsInt()
  horsepower: number;

  @ApiProperty()
  @IsString()
  description: string;
}
