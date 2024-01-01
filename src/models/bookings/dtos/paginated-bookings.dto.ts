import { Expose } from 'class-transformer';
import { Type } from 'class-transformer';
import { Paginated } from 'src/utils/pagination';
import { BookingDto } from './booking.dto';

export class PaginatedBookingsDto {
  constructor(partial: Partial<Paginated>) {
    Object.assign(this, partial);
  }

  @Expose()
  @Type(() => BookingDto)
  content: any[];

  @Expose()
  page: number;

  @Expose()
  totalElements: number;

  @Expose()
  totalPages: number;
}
