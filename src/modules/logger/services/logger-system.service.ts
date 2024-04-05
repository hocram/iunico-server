import { Injectable } from '@nestjs/common';
import { ConsoleLogger } from '@nestjs/common';

// https://docs.nestjs.com/techniques/logger

@Injectable()
export class LoggerSystemService extends ConsoleLogger {


}
