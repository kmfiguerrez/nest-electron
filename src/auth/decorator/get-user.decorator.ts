import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    /*
      If arguments were passed to the GetUser decorator.
      For example, we only want to only return the id.
      @GetUser("id") userId: string
    */
    if (data && typeof data === "string") {
      return request.user[data]
    }

    return request.user;
  },
);