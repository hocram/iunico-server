import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {

  /**
   * 
   * @param appService 
   */
  constructor(private readonly appService: AppService) {}


  @Get('hello')
  getHello(): string {
    return "IUnicò Server: Hello World!";
  }

}
