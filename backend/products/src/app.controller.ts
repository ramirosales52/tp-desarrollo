import { Controller, Get, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller("app")
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("hello")
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("version/:type")
  getVersion(
    @Query() query: { all?: boolean },
    @Param() params: { type: string }
  ): string | { number: number; date: string; creator: string; } {
    return this.appService.getVersion(query, params);
  }
} 
