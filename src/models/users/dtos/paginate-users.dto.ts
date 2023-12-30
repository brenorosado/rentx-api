import { Expose } from 'class-transformer';
import { Type } from 'class-transformer';
import { UserDto } from 'src/models/users/dtos/user.dto';
import { Paginated } from 'src/utils/pagination';

export class PaginatedUsersDto {
  constructor(partial: Partial<Paginated>) {
    Object.assign(this, partial);
  }

  @Expose()
  @Type(() => UserDto)
  content: any[];

  @Expose()
  page: number;

  @Expose()
  totalElements: number;

  @Expose()
  totalPages: number;
}
