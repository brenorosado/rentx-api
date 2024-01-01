import { Injectable } from '@nestjs/common';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
import { UpdateBookingDto } from './dtos/update-booking.dto';
import { GetBookingsDto } from './dtos/get-bookings.dto';
import { getPagination, paginatedParser } from 'src/utils/pagination';

@Injectable()
export class BookingsService {
  constructor(private prismaService: PrismaService) {}

  createBooking(
    { car, user, ...createBookingDto }: CreateBookingDto,
    requestingUser: User,
  ) {
    return this.prismaService.booking.create({
      data: {
        ...createBookingDto,
        car: { connect: { id: car.id } },
        user: { connect: { id: user.id } },
        createdBy: requestingUser.id,
      },
      include: {
        car: true,
        user: true,
      },
    });
  }

  updateBooking(
    { car, user, ...updateBookingDto }: UpdateBookingDto,
    requestingUser: User,
  ) {
    return this.prismaService.booking.update({
      where: { id: updateBookingDto.id },
      data: {
        ...updateBookingDto,
        ...(car && { car: { connect: { id: car.id } } }),
        ...(user && { user: { connect: { id: user.id } } }),
        updatedBy: requestingUser.id,
      },
      include: {
        car: true,
        user: true,
      },
    });
  }

  findById(id: string) {
    return this.prismaService.booking.findUnique({
      where: { id },
      include: {
        car: true,
        user: true,
      },
    });
  }

  find({
    minStartAt,
    maxStartAt,
    minEndAt,
    maxEndAt,
    minTotalPrice,
    maxTotalPrice,
    carId,
    userId,
    size,
    page,
    direction = 'desc',
    orderBy = 'createdAt',
  }: GetBookingsDto) {
    const filters = {
      ...((minStartAt || maxStartAt) && {
        ...(minStartAt && { startAt: { gte: minStartAt } }),
        ...(maxStartAt && { startAt: { lte: maxStartAt } }),
      }),
      ...((minEndAt || maxEndAt) && {
        ...(minEndAt && { endAt: { gte: minEndAt } }),
        ...(maxEndAt && { endAt: { lte: maxEndAt } }),
      }),
      ...((minTotalPrice || maxTotalPrice) && {
        ...(minTotalPrice && { totalPrice: { gte: minTotalPrice } }),
        ...(maxTotalPrice && { totalPrice: { lte: maxTotalPrice } }),
      }),
      ...(carId && { carId: { equals: carId } }),
      ...(userId && { userId: { equals: userId } }),
    };

    const pagination = getPagination(size, page);
    const ordenation = {
      [orderBy]: direction,
    };

    return paginatedParser(
      this.prismaService.$transaction([
        this.prismaService.booking.count({ where: filters }),
        this.prismaService.booking.findMany({
          ...pagination,
          orderBy: ordenation,
          where: filters,
          include: {
            car: true,
            user: true,
          },
        }),
      ]),
      page,
    );
  }
}
