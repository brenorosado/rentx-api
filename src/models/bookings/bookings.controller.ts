import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BookingsService } from './bookings.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateBookingDto } from './dtos/create-booking.dto';
import { RequestingUser } from '../users/decorators/requesting-user.decorator';
import { User } from '@prisma/client';
import { BookingDto } from './dtos/booking.dto';
import { UpdateBookingDto } from './dtos/update-booking.dto';
import { PaginatedBookingsDto } from './dtos/paginated-bookings.dto';
import { GetBookingsDto } from './dtos/get-bookings.dto';

@Controller('booking')
@ApiTags('Booking')
@UseInterceptors(ClassSerializerInterceptor)
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post('/')
  @UseGuards(AuthGuard)
  async createBooking(
    @Body() body: CreateBookingDto,
    @RequestingUser() requestingUser: User,
  ): Promise<BookingDto> {
    const booking = await this.bookingsService.createBooking(
      body,
      requestingUser,
    );
    return new BookingDto(booking);
  }

  @Put('/')
  @UseGuards(AuthGuard)
  async updateBooking(
    @Body() body: UpdateBookingDto,
    @RequestingUser() requestingUser: User,
  ): Promise<BookingDto> {
    const booking = await this.bookingsService.updateBooking(
      body,
      requestingUser,
    );

    return new BookingDto(booking);
  }

  @Get('/:id')
  @UseGuards(AuthGuard)
  async findById(@Param('id') id: string): Promise<BookingDto> {
    const booking = await this.bookingsService.findById(id);
    return new BookingDto(booking);
  }

  @Get('/')
  @UseGuards(AuthGuard)
  async find(@Query() query: GetBookingsDto): Promise<PaginatedBookingsDto> {
    const paginatedBookings = await this.bookingsService.find(query);
    return new PaginatedBookingsDto(paginatedBookings);
  }
}
