import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

// https://www.tomray.dev/nestjs-logging
// https://javascript.plainenglish.io/how-to-use-nestjs-logger-2a9cb107bce9
// https://lsmod.medium.com/nestjs-setting-up-file-logging-daily-rotation-with-winston-28147af56ec4

@Injectable()
export class LoggerMiddlewareService implements NestMiddleware {

  private logger = new Logger(`HTTP`);

  use(req: Request, res: Response, next: NextFunction) {
    const { ip, method, originalUrl } = req;
    const userAgent = req.get('user-agent') || '';
    this.logger.log(`Logging HTTP request: ${method} ${originalUrl} ${res.statusCode} - ${ip} - ${userAgent}`,);
    res.on('finish', () => {
      //if (statusCode === 401 || statusCode === 404 || statusCode === 405) {
      const { statusCode } = res;
      const contentLength = res.get('content-length');
      this.logger.log(`Logging HTTP request finish: ${method} ${originalUrl} ${statusCode} [${contentLength}] - ${ip} - ${userAgent}`,);
    });
    next();
  }

}
