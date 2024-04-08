import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    if (
      !request.requestingUser ||
      request?.requestingUser?.deleted ||
      request.requestingUser.role !== 'ADMIN'
    ) {
      throw new UnauthorizedException(
        "You don't have permission to access this resource",
      );
    }

    return request.requestingUser.role === 'ADMIN';
  }
}
