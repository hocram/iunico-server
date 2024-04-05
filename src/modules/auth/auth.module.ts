import { Module } from '@nestjs/common';
import { AuthsController } from './controllers/auths.controller';
import { AuthService } from 'src/modules/auth/services/auths.service';

// AUTH
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthGateway } from './gateways/auths.gateway';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

// MODULES
import { UserModule } from 'src/modules/user/user.module';
import { SocketGatewayModule } from 'src/modules/socket-gateway/socket-gateway.module';

@Module({
  imports: [
    // MODULES
    UserModule,
    SocketGatewayModule,
    // JWT - AUTH
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secret: 'SECRET_KEY', // process.env.JWT_SECRET, || configService.get('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d', // process.env.EXPIRESIN, '1d' '12h' '60s' '10000s'
          //algorithm: 'HS384',
        },
        //verifyOptions: {
        //  algorithms: ['HS384'],
        //},
      }),
      inject: [ConfigService],
    }),
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
  ],
  controllers: [
    AuthsController,
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    // SOCKETS
    AuthGateway,
  ],
  exports: [
    AuthService,
  ]
})
export class AuthModule { }
