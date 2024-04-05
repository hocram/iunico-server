import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

import { AuthService } from "src/modules/auth/services/auths.service";
import { AuthLoginDto } from "src/modules/auth/models/dtos/auth-login-dto";
import { LoginStatusDto } from "src/modules/auth/models/dtos/login-status.dto";


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {

  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passReqToCallback: false,
    });
  }

  async validate(username: string, password: string): Promise<LoginStatusDto> {
    const loginStatus: LoginStatusDto = await this.authService.login({username, password} as AuthLoginDto);
    if (!loginStatus) {
      //throw new UnauthorizedException();
    }
    return loginStatus;
  }

}