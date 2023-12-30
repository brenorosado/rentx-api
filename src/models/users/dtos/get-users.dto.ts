import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRoles } from '../enums/user-roles.enum';

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
}
