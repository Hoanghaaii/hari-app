import { Injectable } from '@nestjs/common';

@Injectable()
export class ReactionServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
