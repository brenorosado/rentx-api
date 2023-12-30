import { IsString, IsOptional, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../enums/user-roles.enum';
import { Direction } from 'src/utils/pagination';
import { Transform } from 'class-transformer';

export class GetUsersDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  email: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  cnh: string;

  @ApiProperty({ required: false, enum: UserRoles })
  @IsOptional()
  role: keyof typeof UserRoles;

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
