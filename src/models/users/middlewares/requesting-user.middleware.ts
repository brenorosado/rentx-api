import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { decodeToken } from 'src/utils/token';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      requestingUser?: User;
    }
  }
}

@Injectable()
export class RequestingUserMiddleware implements NestMiddleware {
  constructor(private prismaService: PrismaService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers?.authorization?.split(' ')[1];
    try {
      if (token !== null) {
        const user = decodeToken(token)?.user;

        const userData = await this.prismaService.user.findUnique({
          where: { id: user?.id },
        });

        if (!userData) {
          throw new UnauthorizedException();
        }

        req.requestingUser = userData;
      }
    } catch {
      if (!!token) throw new UnauthorizedException();
    } finally {
      next();
    }
  }
}
