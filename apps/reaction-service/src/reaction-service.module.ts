import { Module } from '@nestjs/common';
import { ReactionServiceController } from './reaction-service.controller';
import { ReactionServiceService } from './reaction-service.service';

@Module({
  imports: [],
  controllers: [ReactionServiceController],
  providers: [ReactionServiceService],
})
export class ReactionServiceModule {}
