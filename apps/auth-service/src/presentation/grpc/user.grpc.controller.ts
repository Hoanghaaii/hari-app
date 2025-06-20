import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from '../../application/services/auth.service';

@Controller()
export class AuthGrpcController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod('AuthService', 'Ping')
  ping(_: any, __: any) {
    return this.authService.ping();
  }

  @GrpcMethod('AuthService', 'Register')
  register(data: { email: string; password: string; name: string }, __: any) {
    return this.authService.register(data);
  }
}
