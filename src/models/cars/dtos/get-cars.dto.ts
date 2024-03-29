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
  @Transform(({ value }) => parseInt(value))
  minPricePerDay: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  maxPricePerDay: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  maxKmPerHour: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
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
  @Transform(({ value }) => parseInt(value))
  maxPeopleCapacity: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  horsepower: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({ required: false, default: 'createdAt' })
  @IsOptional()
  @IsString()
  orderBy: string;

  @ApiProperty({ required: false, default: 'desc', enum: Direction })
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
