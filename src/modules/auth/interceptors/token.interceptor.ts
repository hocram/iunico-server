import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserDto } from 'src/modules/user/models/dtos/users/user-dto';
import { AuthService } from 'src/modules/auth/services/auths.service';

@Injectable()
export class TokenInterceptor implements NestInterceptor {

  // constructor
  constructor(
    private readonly authService: AuthService,
  ){}

  // INTERCEPT
  intercept(
    context: ExecutionContext,
    next: CallHandler<UserDto>,
  ): Observable<UserDto> {
    return next.handle().pipe(
      map((user) => {
        const response = context.switchToHttp().getResponse<Response>();
        const token = this.authService.generateJwt(user);
        response.setHeader('Authorization', `Bearer ${token}`);
        response.cookie('token', token, {
          httpOnly: true,
          signed: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });
        return user;
      }),
    );
  }
}
