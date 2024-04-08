import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from '../dtos/user.dto';
import { AuthenticationDto } from './dtos/authentication.dto';
import { SignInDto } from './dtos/sign-in.dto';
import { SignUpDto } from './dtos/sign-up.dto';

@Controller('/authentication')
@ApiTags('Authentication')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/sign-up')
  async signUp(@Body() body: SignUpDto): Promise<UserDto> {
    const user = await this.authService.signUp(body);
    return new UserDto(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/sign-in')
  async signIn(@Body() body: SignInDto): Promise<AuthenticationDto> {
    const authData = await this.authService.signIn(body);
    console.log('authData', authData);
    const authentication = new AuthenticationDto(authData);
    console.log('authentication', authentication);
    return authentication;
  }
}
