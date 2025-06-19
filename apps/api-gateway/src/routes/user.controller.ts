import { Controller, Get, Param, Inject } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

interface UserService {
  ping(data: {}): any;
  getUser(data: { id: string }): any;
}

@Controller('users')
export class UserController {
  private userService: UserService;

  constructor(@Inject('USER_SERVICE') private client: ClientGrpc) {}

  onModuleInit() {
    this.userService = this.client.getService<UserService>('UserService');
  }

  @Get('ping')
  async ping() {
    return this.userService.ping({});
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.getUser({ id });
  }
} 