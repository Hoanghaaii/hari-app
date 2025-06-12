import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from '../../application/services/auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Ping')
  ping(data: any): { message: string } {
    return this.authService.ping();
  }

  @GrpcMethod('AuthService', 'Login')
  login(data: { email: string; password: string }) {
    return this.authService.login(data.email, data.password);
  }

  @GrpcMethod('AuthService', 'ValidateToken')
  validateToken(data: { token: string }) {
    return this.authService.validateToken(data.token);
  }
}
