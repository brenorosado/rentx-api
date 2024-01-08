import { PrismaService } from 'src/prisma.service';
import { SignUpDto } from './dtos/sign-up.dto';
import {
  encryptKey,
  generateSixDigitCode,
  validateKey,
} from 'src/utils/auth-encrypt';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dtos/sign-in.dto';
import { sendForgottenPasswordEmail } from 'src/utils/send-email';
import { ResetPasswordDto } from './dtos/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService) {}

  async signUp(createUserDto: SignUpDto) {
    const encryptedPassword = await encryptKey(createUserDto.password);

    const userWithSameEmailOrCnh = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { email: { equals: createUserDto.email } },
          { cnh: { equals: createUserDto.cnh } },
        ],
      },
    });

    if (userWithSameEmailOrCnh)
      throw new BadRequestException('E-mail or CNH already registered.');

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

    const passwordMatch = await validateKey(password, user.password);

    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async sendResetPasswordEmail(email: string) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { code, encryptedCode } = await generateSixDigitCode();

    const previousCode = await this.prismaService.code.findUnique({
      where: {
        userId: user.id,
      },
    });

    if (previousCode) {
      await this.prismaService.code.delete({ where: { id: previousCode.id } });
    }

    await this.prismaService.code.create({
      data: {
        value: encryptedCode,
        userId: user.id,
      },
    });

    await sendForgottenPasswordEmail(email, code);
  }

  async resetPassword({ code, password, email }: ResetPasswordDto) {
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existingCode = await this.prismaService.code.findUnique({
      where: {
        userId: user.id,
      },
    });

    const validCode = validateKey(code, existingCode.value);

    if (!validCode) throw new BadRequestException('Invalid code');

    const encryptedPassword = await encryptKey(password);

    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        password: encryptedPassword,
      },
    });
  }
}
