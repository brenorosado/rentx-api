import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { PrismaService } from 'src/prisma.service';
import { BookingsService } from './bookings.service';

@Module({
  imports: [],
  controllers: [BookingsController],
  providers: [PrismaService, BookingsService],
})
export class BookingsModule {}
