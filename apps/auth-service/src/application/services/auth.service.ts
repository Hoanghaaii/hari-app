import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  ping(): { message: string } {
    return { message: 'Auth Service is running!' };
  }

  login(email: string, password: string) {
    return {
      email,
      message: `Login attempt for: ${email}`,
      success: true,
      token: 'fake-jwt-token-123',
      service: 'auth-service',
      timestamp: new Date().toISOString(),
    };
  }

  validateToken(token: string) {
    return {
      token,
      valid: token === 'fake-jwt-token-123',
      message: 'Token validation',
      service: 'auth-service',
      timestamp: new Date().toISOString(),
    };
  }
}
