import { Controller, Get } from '@nestjs/common';
import { ReactionServiceService } from './reaction-service.service';

@Controller()
export class ReactionServiceController {
  constructor(private readonly reactionServiceService: ReactionServiceService) {}

  @Get()
  getHello(): string {
    return this.reactionServiceService.getHello();
  }
}
