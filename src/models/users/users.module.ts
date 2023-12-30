import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { RequestingUserMiddleware } from './middlewares/requesting-user.middleware';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [PrismaService, AuthService, UsersService],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestingUserMiddleware).forRoutes('*');
  }
}
