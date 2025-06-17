import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HealthController } from './health.controller';
import { ConfigService } from '../config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: configService.userService.package,
            protoPath: configService.userService.protoPath,
            url: configService.userService.url,
          },
        }),
        inject: [ConfigService],
      },
      {
        name: 'AUTH_SERVICE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: configService.authService.package,
            protoPath: configService.authService.protoPath,
            url: configService.authService.url,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
