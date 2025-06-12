import { Test, TestingModule } from '@nestjs/testing';
import { ReactionServiceController } from './reaction-service.controller';
import { ReactionServiceService } from './reaction-service.service';

describe('ReactionServiceController', () => {
  let reactionServiceController: ReactionServiceController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ReactionServiceController],
      providers: [ReactionServiceService],
    }).compile();

    reactionServiceController = app.get<ReactionServiceController>(ReactionServiceController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(reactionServiceController.getHello()).toBe('Hello World!');
    });
  });
});
