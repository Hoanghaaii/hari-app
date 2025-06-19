import { Controller, Get, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('health')
export class HealthController {
  private userService: any;
  private authService: any;

  constructor(
    @Inject('USER_SERVICE') private userClient: ClientGrpc,
    @Inject('AUTH_SERVICE') private authClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.userService = this.userClient.getService('UserService');
    this.authService = this.authClient.getService('AuthService');
  }

  @Get()
  async check() {
    try {
      const [userPing, authPing] = await Promise.all([
        firstValueFrom(this.userService.ping({})),
        firstValueFrom(this.authService.ping({})),
      ]);

      return {
        status: 'healthy',
        services: {
          userService: userPing ? 'healthy' : 'unhealthy',
          authService: authPing ? 'healthy' : 'unhealthy',
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Get('liveness')
  liveness() {
    return {
      status: 'ok',
      service: 'api-gateway',
      timestamp: new Date().toISOString(),
    };
  }
} 