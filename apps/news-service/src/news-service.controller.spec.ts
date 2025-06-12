import { Test, TestingModule } from '@nestjs/testing';
import { NewsServiceController } from './news-service.controller';
import { NewsServiceService } from './news-service.service';

describe('NewsServiceController', () => {
  let newsServiceController: NewsServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [NewsServiceController],
      providers: [NewsServiceService],
    }).compile();

    newsServiceController = app.get<NewsServiceController>(NewsServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(newsServiceController.getHello()).toBe('Hello World!');
    });
  });
});
