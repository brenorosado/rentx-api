import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Query,
  UseGuards,
  Delete,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';
import { GetUsersDto } from './dtos/get-users.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { RequestingUser } from './decorators/requesting-user.decorator';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { PaginatedUsersDto } from './dtos/paginate-users.dto';
import { SendForgottenPasswordEmailDto } from './dtos/send-reset-password-email.dto';

@Controller('/user')
@ApiTags('User')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth()
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}
  @UseGuards(AdminGuard)
  @Post('/')
  async create(
    @Body() body: CreateUserDto,
    @RequestingUser() requestingUser: User,
  ): Promise<UserDto> {
    const user = await this.usersService.create(body, requestingUser);
    return new UserDto(user);
  }

  @UseGuards(AuthGuard)
  @Get('/authenticated-user')
  getAuthenticatedUser(@RequestingUser() requestingUser: User): UserDto {
    return new UserDto(requestingUser);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.usersService.findById(id);
    return new UserDto(user);
  }

  @UseGuards(AuthGuard)
  @Get('/')
  async find(@Query() query: GetUsersDto): Promise<PaginatedUsersDto> {
    const paginatedUsers = await this.usersService.find(query);
    return new PaginatedUsersDto(paginatedUsers);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(
    @Param('id') id: string,
    @RequestingUser() requestingUser: User,
  ): Promise<UserDto> {
    const user = await this.usersService.deleteById(id, requestingUser);
    return new UserDto(user);
  }

  @UseGuards(AuthGuard)
  @Put()
  async update(
    @Body() body: UpdateUserDto,
    @RequestingUser() requestingUser: User,
  ): Promise<UserDto> {
    const user = await this.usersService.update(body, requestingUser);
    return new UserDto(user);
  }

  @Post('/send-reset-password-email')
  async sendResetPasswordEmail(@Body() body: SendForgottenPasswordEmailDto) {
    await this.authService.sendResetPasswordEmail(body.email);
  }
}
