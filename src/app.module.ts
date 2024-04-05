import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
// PATH
import { join } from 'path';
import * as path from 'path';
// AUTO MAPPER
import { AutomapperModule, InjectMapper } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
// TYPE ORM
import { TypeOrmModule } from '@nestjs/typeorm';

// MODULES
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { LoggerModule } from './modules/logger/log.module';
import { SocketGatewayModule } from './modules/socket-gateway/socket-gateway.module';

// LOGGER MIDDLEWARE SERVICE
import { LoggerMiddlewareService } from './modules/logger/services/logger-middleware.service';
import { log } from 'console';

const ENV = process.env.NODE_ENV || "dev";
console.log("__dirname:", __dirname);
console.log("enviroment:", ENV);
console.log("enviroment file:", !ENV ? '.env' : `src/enviroments/${ENV}.env`);

@Module({
  imports: [
    // CONFIGURE
    ConfigModule.forRoot({
      isGlobal: true,
      //ignoreEnvFile: true,
      envFilePath: !ENV ? '.env' : `src/enviroments/${ENV}.env`,
      //load: [file config / app.config.ts]
    }),
    // AUTO MAPPER
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    //RedisModule,
    // TYPEORM
    TypeOrmModule.forRoot({
      type: 'sqlite',  //process.env.DB_TYPE as any, 
      // host: process.env.DB_HOST,
      // port: parseInt(process.env.DB_PORT),
      // username: process.env.DB_USERNAME,
      // password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      //entities: [__dirname + "/**/*-entity{.ts,.js}"],
      entities: [join(__dirname, '**', '*-entity.{js,ts}')],
      database: path.resolve(__dirname, '../../db', 'db.sqlite'),
      //database: process.env.DB_NAME,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      // ENTITY
    ]),
    // MODULES
    UserModule,
    AuthModule,
    LoggerModule,
    SocketGatewayModule,
  ],
  controllers: [
    // APP CONTROLLER
    AppController,
    // CONTROLLER
  ],
  providers: [
    // APP SERVICE
    AppService,
    // SERVICES
    ConfigService,
    // MAPPERS
    // SOCKETS
  ],
})
export class AppModule {

  constructor(
    private readonly configService: ConfigService
  ){
    if(!configService){
      console.log("AppModule configService: NOT FOUND!");
    } else {
      const HELLO_MSG = configService.get<string>('HELLO_MSG') || "ENV NOT FOUND";
      console.log("AppModule configService HELLO_MSG: ", HELLO_MSG);
    }
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddlewareService).forRoutes('*');
  }
}
