import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  ping(): { message: string } {
    return { message: 'User Service is running!' };
  }

  getUser(id: string) {
    return {
      id,
      message: `Get user with ID: ${id}`,
      service: 'user-service',
      timestamp: new Date().toISOString(),
    };
  }
}
