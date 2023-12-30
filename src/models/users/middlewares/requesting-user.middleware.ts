import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from '../users.service';
import { User } from '@prisma/client';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      requestingUser?: User;
      session: { userId: string };
    }
  }
}

@Injectable()
export class RequestingUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const { userId } = req.session || {};
    if (userId) {
      const user = await this.usersService.findById(userId);

      if (!user) {
        req.session.userId = null;
        throw new UnauthorizedException();
      }

      req.requestingUser = user;
    }

    next();
  }
}
