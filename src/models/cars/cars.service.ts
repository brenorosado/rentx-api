import { Injectable } from '@nestjs/common';
import { CreateCarDto } from './dtos/create-car.dto';
import { PrismaService } from 'src/prisma.service';
import { UpdateCarDto } from './dtos/update-car.dto';
import { GetCarsDto } from './dtos/get-cars.dto';
import { getPagination, paginatedParser } from 'src/utils/pagination';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class CarsService {
  constructor(private prismaService: PrismaService) {}

  createCar(createCarDto: CreateCarDto, requestingUser: User) {
    return this.prismaService.car.create({
      data: { ...createCarDto, createdBy: requestingUser.id },
    });
  }

  updateCar(updateCarDto: UpdateCarDto, requestingUser: User) {
    return this.prismaService.car.update({
      where: { id: updateCarDto.id },
      data: { ...updateCarDto, updatedBy: requestingUser.id },
    });
  }

  findById(id: string) {
    return this.prismaService.car.findUnique({ where: { id } });
  }

  async find({
    make,
    model,
    minPricePerDay,
    maxPricePerDay,
    maxKmPerHour,
    timeToAHundredKmPerHour,
    fuelType,
    gearType,
    maxPeopleCapacity,
    horsepower,
    description,
    size,
    page,
    direction = 'desc',
    orderBy = 'createdAt',
  }: GetCarsDto) {
    const filters = {
      ...(make && {
        make: { contains: make, mode: Prisma.QueryMode.insensitive },
      }),
      ...(model && {
        model: { contains: model, mode: Prisma.QueryMode.insensitive },
      }),
      ...((minPricePerDay || maxPricePerDay) && {
        pricePerDay: {
          ...(minPricePerDay && { gte: minPricePerDay }),
          ...(maxPricePerDay && { lte: maxPricePerDay }),
        },
      }),
      ...(maxKmPerHour && {
        maxKmPerHour: { lte: maxKmPerHour },
      }),
      ...(timeToAHundredKmPerHour && {
        timeToAHundredKmPerHour: { lte: timeToAHundredKmPerHour },
      }),
      ...(fuelType && {
        fuelType: { equals: fuelType },
      }),
      ...(gearType && {
        gearType: { equals: gearType },
      }),
      ...(maxPeopleCapacity && {
        maxPeopleCapacity: { lte: maxPeopleCapacity },
      }),
      ...(horsepower && {
        horsepower: { lte: horsepower },
      }),
      ...(description && {
        description: {
          contains: description,
          mode: Prisma.QueryMode.insensitive,
        },
      }),
    };

    const pagination = getPagination(size, page);
    const ordenation = {
      [orderBy]: direction,
    };

    return paginatedParser(
      this.prismaService.$transaction([
        this.prismaService.car.count({ where: filters }),
        this.prismaService.car.findMany({
          ...pagination,
          orderBy: ordenation,
          where: filters,
        }),
      ]),
      page,
    );
  }

  deleteCar(id: string) {
    return this.prismaService.car.delete({ where: { id } });
  }
}
