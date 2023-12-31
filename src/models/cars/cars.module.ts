import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { PrismaService } from 'src/prisma.service';
import { CarsService } from './cars.service';

@Module({
  imports: [],
  controllers: [CarsController],
  providers: [PrismaService, CarsService],
})
export class CarsModule {}
