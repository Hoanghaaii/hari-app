import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HealthController } from './health.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createAppConfig } from '../config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./envs/.env.api-gateway', './envs/.env.shared'],
      isGlobal: true,
    }),
    ClientsModule.registerAsync({
      clients: [
        {
          name: 'USER_SERVICE',
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
          useFactory: (configService: ConfigService) => {
            const appConfig = createAppConfig(configService);
            return {
              transport: Transport.GRPC,
              options: appConfig.services.auth.options,
            };
          },
          inject: [ConfigService],
        },
      ],
    }),
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: 'APP_CONFIG',
      useFactory: (configService: ConfigService) =>
        createAppConfig(configService),
      inject: [ConfigService],
    },
  ],
})
export class HealthModule {}
