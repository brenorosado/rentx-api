import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { Injectable } from '@nestjs/common';
import { encryptPassword } from 'src/utils/encrypt-password';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const encryptedPassword = await encryptPassword(createUserDto.password);

    return this.prismaService.user.create({
      data: { ...createUserDto, password: encryptedPassword },
    });
  }
}
