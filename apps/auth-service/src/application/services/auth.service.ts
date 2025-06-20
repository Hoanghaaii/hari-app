import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  // Add your methods here
  constructor() {}

  ping() {
    return { message: 'pong' };
  }

  register(data: { email: string; password: string; name: string }) {
    // TODO: Add real registration logic, e.g., save to DB, hash password, etc.
    return {
      accessToken: 'mockAccessToken',
      refreshToken: 'mockRefreshToken',
      message: `User ${data.email} registered successfully`,
    };
  }
}
