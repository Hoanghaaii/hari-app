import { Controller, Post, Get, Body, Query, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

interface AuthService {
  ping(data: {}): any;
  login(data: { email: string; password: string }): any;
  validateToken(data: { token: string }): any;
}

@Controller('auth')
export class AuthGatewayController {
  private authService: AuthService;

  constructor(@Inject('AUTH_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.authService = this.client.getService<AuthService>('AuthService');
  }

  @Get('ping')
  async ping() {
    return this.authService.ping({});
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body);
  }

  @Get('validate')
  async validateToken(@Query('token') token: string) {
    return this.authService.validateToken({ token });
  }
}
