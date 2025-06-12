import { Injectable } from '@nestjs/common';

@Injectable()
export class NewsServiceService {
  getHello(): string {
    return 'Hello World!';
  }
}
