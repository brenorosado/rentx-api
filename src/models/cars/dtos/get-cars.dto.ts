import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsString, IsOptional } from 'class-validator';
import { FuelType } from '../enums/fuel-type.enum';
import { GearType } from '../enums/gear-type.enum';
import { Transform } from 'class-transformer';
import { Direction } from 'src/utils/pagination';

export class GetCarsDto {
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
  minPricePerDay: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  maxPricePerDay: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  maxKmPerHour: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  timeToAHundredKmPerHour: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEnum(FuelType)
  fuelType: keyof typeof FuelType;

  @ApiProperty({ required: false })
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

  @ApiProperty({ required: false, default: 'createdAt' })
  @IsOptional()
  @IsString()
  orderBy: string;

  @ApiProperty({ required: false, default: 'desc' })
  @IsOptional()
  @IsEnum(Direction)
  direction: keyof typeof Direction;

  @ApiProperty({ required: false, default: 10 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  size: number;

  @ApiProperty({ required: false, default: 1 })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  page: number;
}
