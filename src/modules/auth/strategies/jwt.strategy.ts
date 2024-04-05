import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { JwtPayload } from 'src/modules/auth/models/dtos/jwt-payload.interface';
import { AuthService } from 'src/modules/auth/services/auths.service';
import { UserDto } from 'src/modules/user/models/dtos/users/user-dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SECRET_KEY', // process.env.APP_SECRET, || configService.get<string>('JWT_SECRET_KEY')
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  // VALIDATE
  async validate(payload: JwtPayload): Promise<UserDto> { 
    //payload: { userId: number }) { 
    //return await this.authService.verifyPayload(payload);
    // return { sub: payload.sub, email: payload.email, role: payload.role };
    let user: UserDto = await this.authService.getUserDtoByPayload(payload);
    return user;
  }
}