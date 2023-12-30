import { PrismaService } from 'src/prisma.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { GetUsersDto } from './dtos/get-users.dto';
import { Prisma, User } from '@prisma/client';
import { UpdateUserDto } from './dtos/update-user.dto';
import { encryptPassword } from 'src/utils/encrypt-password';
import { CreateUserDto } from './dtos/create-user.dto';
import { getPagination, paginatedParser } from 'src/utils/pagination';
@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto, requestingUser: User) {
    const encryptedPassword = await encryptPassword(createUserDto.password);

    return this.prismaService.user.create({
      data: {
        ...createUserDto,
        role: 'ADMIN',
        password: encryptedPassword,
        createdBy: requestingUser.id,
      },
    });
  }

  findById(id: string) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  async find({
    name,
    email,
    cnh,
    role,
    size,
    page,
    direction = 'desc',
    orderBy = 'createdAt',
  }: GetUsersDto) {
    const filters = {
      ...(name && {
        name: { contains: name, mode: Prisma.QueryMode.insensitive },
      }),
      ...(email && {
        email: { contains: email, mode: Prisma.QueryMode.insensitive },
      }),
      ...(cnh && {
        cnh: { contains: cnh, mode: Prisma.QueryMode.insensitive },
      }),
      ...(role && { role: { equals: role } }),
    };

    const pagination = getPagination(size, page);
    const ordenation = {
      [orderBy]: direction,
    };

    return paginatedParser(
      this.prismaService.$transaction([
        this.prismaService.user.count({ where: filters }),
        this.prismaService.user.findMany({
          ...pagination,
          orderBy: ordenation,
          where: filters,
        }),
      ]),
      page,
    );
  }

  async update(updateUserDto: UpdateUserDto, requestingUser: User) {
    if (
      requestingUser.id !== updateUserDto.id &&
      requestingUser.role !== 'ADMIN'
    ) {
      throw new ForbiddenException('You cannot update another user account.');
    }

    return this.prismaService.user.update({
      where: { id: updateUserDto.id },
      data: { ...updateUserDto, updatedBy: requestingUser.id },
    });
  }

  async deleteById(id: string, requestingUser: User) {
    if (requestingUser.id !== id && requestingUser.role !== 'ADMIN') {
      throw new ForbiddenException('You cannot delete another user account.');
    }

    return this.prismaService.user.delete({ where: { id } });
  }
}
