import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Direction } from 'src/utils/pagination';

export class GetBookingsDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  minStartAt: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  maxStartAt: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  minEndAt: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  maxEndAt: Date;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  minTotalPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Transform(({ value }) => parseInt(value))
  maxTotalPrice: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  carId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userId: string;

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
