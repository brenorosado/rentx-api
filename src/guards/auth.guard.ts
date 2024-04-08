import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (!request.requestingUser || request?.requestingUser?.deleted) {
      throw new UnauthorizedException();
    }

    return request.requestingUser;
  }
}
