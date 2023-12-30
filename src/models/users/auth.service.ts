import { PrismaService } from 'src/prisma.service';
import { SignUpDto } from './dtos/sign-up.dto';
import { encryptPassword, validatePassowrd } from 'src/utils/encrypt-password';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signUp(createUserDto: SignUpDto) {
    const encryptedPassword = await encryptPassword(createUserDto.password);

    return this.prismaService.user.create({
      data: { ...createUserDto, role: 'USER', password: encryptedPassword },
    });
  }

  async signIn({ email, password }: SignInDto) {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const passwordMatch = await validatePassowrd(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
