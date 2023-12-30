import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Query,
  Session,
  HttpCode,
  HttpStatus,
  UseGuards,
  Delete,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/sign-in.dto';
import { GetUsersDto } from './dtos/get-users.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { RequestingUser } from './decorators/requesting-user.decorator';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('/user')
@ApiTags('User')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('/sign-up')
  signUp(@Body() body: SignUpDto) {
    return this.authService.signUp(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(@Body() body: SignInDto, @Session() session: any) {
    const user = await this.authService.signIn(body);
    session.userId = user.id;
    return user;
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-out')
  signOut(@Session() session: any) {
    session.userId = null;
  }

  @UseGuards(AdminGuard)
  @Post('/')
  create(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  findById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(AdminGuard)
  @Get('/')
  find(@Query() query: GetUsersDto) {
    return this.usersService.find(query);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  delete(@Param('id') id: string, @RequestingUser() requestingUser: User) {
    return this.usersService.deleteById(id, requestingUser);
  }

  @UseGuards(AuthGuard)
  @Put()
  update(@Body() body: UpdateUserDto, @RequestingUser() requestingUser: User) {
    return this.usersService.update(body, requestingUser);
  }
}
