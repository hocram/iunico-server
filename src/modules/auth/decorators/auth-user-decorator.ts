import { createParamDecorator, ExecutionContext, UnsupportedMediaTypeException } from '@nestjs/common';
import { Request } from 'express';
import { UserDto } from 'src/modules/user/models/dtos/users/user-dto';

export const AuthUser = createParamDecorator(
  (data: keyof UserDto, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user as UserDto;
    return user ? user : null;
  },
);