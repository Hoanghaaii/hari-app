import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { UserService } from '../../application/services/user.service';

interface Empty {}
interface PingResponse {
  message: string;
}

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @GrpcMethod('UserService', 'Ping')
  ping(_data: Empty, _metadata: any, _call: any): PingResponse {
    // Có thể bổ sung logics kiểm tra, logging, hoặc trả về thêm thông tin nếu cần
    return this.userService.ping();
  }

  @GrpcMethod('UserService', 'GetUser')
  getUser(data: { id: string }) {
    return this.userService.getUser(data.id);
  }
}
