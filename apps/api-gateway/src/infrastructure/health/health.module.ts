import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HealthController } from './health.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createAppConfig } from '../config/app.config';

@Module({
  imports: [
    ConfigModule, // Import ConfigModule để sử dụng ConfigService
    ClientsModule.registerAsync([
      {
        name: 'USER_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const appConfig = createAppConfig(configService);
          return {
            transport: Transport.GRPC,
            options: appConfig.services.user.options,
          };
        },
        inject: [ConfigService],
      },
      {
        name: 'AUTH_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const appConfig = createAppConfig(configService);
          return {
            transport: Transport.GRPC,
            options: appConfig.services.auth.options,
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
