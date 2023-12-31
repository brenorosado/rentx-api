import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarsService } from './cars.service';
import { AdminGuard } from 'src/guards/admin.guard';
import { CreateCarDto } from './dtos/create-car.dto';
import { CarDto } from './dtos/car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { PaginatedCarsDto } from './dtos/paginated-cars.dto';
import { GetCarsDto } from './dtos/get-cars.dto';
import { RequestingUser } from '../users/decorators/requesting-user.decorator';
import { User } from '@prisma/client';

@Controller('car')
@ApiTags('Car')
@UseInterceptors(ClassSerializerInterceptor)
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Post('/')
  @UseGuards(AdminGuard)
  async createCar(
    @Body() body: CreateCarDto,
    @RequestingUser() requestingUser: User,
  ): Promise<CarDto> {
    const car = await this.carsService.createCar(body, requestingUser);
    return new CarDto(car);
  }

  @Put('/')
  @UseGuards(AdminGuard)
  async updateCar(
    @Body() body: UpdateCarDto,
    @RequestingUser() requestingUser: User,
  ): Promise<CarDto> {
    const car = await this.carsService.updateCar(body, requestingUser);
    return new CarDto(car);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: string): Promise<CarDto> {
    const car = await this.carsService.findById(id);
    return new CarDto(car);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async findId(@Query() query: GetCarsDto) {
    const paginatedCars = await this.carsService.find(query);
    return new PaginatedCarsDto(paginatedCars);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  async deleteCar(@Param('id') id: string) {
    const car = await this.carsService.deleteCar(id);
    return new CarDto(car);
  }
}
