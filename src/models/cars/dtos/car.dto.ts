import { Expose } from 'class-transformer';

export class CarDto {
  constructor(partial: Partial<CarDto>) {
    Object.assign(this, partial);
  }

  @Expose()
  id: string;

  @Expose()
  make: string;

  @Expose()
  model: string;

  @Expose()
  pricePerDay: number;

  @Expose()
  timeToAHundredKmPerHour: number;

  @Expose()
  fuelType: string;

  @Expose()
  gearType: string;

  @Expose()
  maxPeopleCapacity: number;

  @Expose()
  horsepower: number;

  @Expose()
  description: string;

  @Expose()
  createdAt: Date;

  @Expose()
  createdBy: string;

  @Expose()
  updatedAt: Date;

  @Expose()
  updatedBy: string;
}
