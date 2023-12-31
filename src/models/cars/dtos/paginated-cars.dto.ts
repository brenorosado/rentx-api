import { Expose } from 'class-transformer';
import { Type } from 'class-transformer';
import { CarDto } from './car.dto';
import { Paginated } from 'src/utils/pagination';

export class PaginatedCarsDto {
  constructor(partial: Partial<Paginated>) {
    Object.assign(this, partial);
  }

  @Expose()
  @Type(() => CarDto)
  content: any[];

  @Expose()
  page: number;

  @Expose()
  totalElements: number;

  @Expose()
  totalPages: number;
}
