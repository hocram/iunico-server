import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const DEFAULT_HOST = process.env.HOST || 'http://localhost';
const DEFAULT_PORT = process.env.PORT || 3000;
const DEFAULT_HOSTNAME_MASK = process.env.DEFAULT_HOSTNAME_MASK || '0.0.0.0';

async function bootstrap() {
  // APP
  const app = await NestFactory.create(AppModule, {
    cors: true
    //logger: ['error', 'warn', 'debug'],
  });
  //
  const config = app.get(ConfigService);
  const PORT = DEFAULT_PORT; //config.get('app.port') || 3000;
  //
  app.setGlobalPrefix('api');
  //app.enableCors();
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  //
  // app.use(function (req, res, next) {
  //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  //   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  //   res.setHeader('Access-Control-Allow-Credentials', true);
  //   next();
  // });
  //
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }));
  //
  //app.useGlobalFilters(new HttpExceptionFilter());
  //app.useGlobalInterceptors(new TimeoutInterceptor());

  // SWAGGER
  const configSwagger = new DocumentBuilder()
    //.addCookieAuth('auth')
    //.addBearerAuth('Autorization', 'header')
    //.setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .setTitle('IUnicò Server')
    .setDescription('Iunicò App Template Rest API Documents')
    .setContact('Hocram - Marco Di Pasquale', 'https://www.iunicocreative.it', 'hocram@gmail.com')
    .setVersion('1.0.0')
    .addTag('Iunicò')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, configSwagger);
  SwaggerModule.setup('/api/docs', app, swaggerDocument, {
    // swaggerUrl: `${hostDomain}/api/docs/swagger.json`,
    explorer: true,
    jsonDocumentUrl: 'openapi.json',
    swaggerOptions: {
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
  });
  //
  app.use('/api/docs/swagger.json', (req, res) => {
    res.send(swaggerDocument)
  });

  // SERVER
  await app.listen(PORT, DEFAULT_HOSTNAME_MASK, () => console.log('START SERVER ON: ' + DEFAULT_HOST + ':' + PORT ));
}
bootstrap();
