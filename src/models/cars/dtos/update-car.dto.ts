import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { FuelType } from '../enums/fuel-type.enum';
import { GearType } from '../enums/gear-type.enum';

export class UpdateCarDto {
  @ApiProperty({ required: true })
  @IsOptional()
  @IsString()
  id: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  make: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  model: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  pricePerDay: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  maxKmPerHour: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  timeToAHundredKmPerHour: number;

  @ApiProperty({ required: false, enum: FuelType })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType: keyof typeof FuelType;

  @ApiProperty({ required: false, enum: GearType })
  @IsOptional()
  @IsEnum(GearType)
  gearType: keyof typeof GearType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  maxPeopleCapacity: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  horsepower: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;
}
