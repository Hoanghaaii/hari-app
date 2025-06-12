import { Module } from '@nestjs/common';
import { NewsServiceController } from './news-service.controller';
import { NewsServiceService } from './news-service.service';

@Module({
  imports: [],
  controllers: [NewsServiceController],
  providers: [NewsServiceService],
})
export class NewsServiceModule {}
