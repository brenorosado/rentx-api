import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const RequestingUser = createParamDecorator(
  (data: never, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    console.log('REQUEST IN DECORATOR', request);
    return request.requestingUser;
  },
);
