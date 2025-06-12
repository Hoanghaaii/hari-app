import { Controller, Get } from '@nestjs/common';
import { NewsServiceService } from './news-service.service';

@Controller()
export class NewsServiceController {
  constructor(private readonly newsServiceService: NewsServiceService) {}

  @Get()
  getHello(): string {
    return this.newsServiceService.getHello();
  }
}
