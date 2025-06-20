import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './routes/auth.controller';
import { HealthController } from './routes/health.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createAppConfig } from './config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./envs/.env.api-gateway', './envs/.env.shared'],
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
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
  controllers: [AuthController, HealthController],
  providers: [
    {
      provide: 'APP_CONFIG',
      useFactory: (configService: ConfigService) =>
        createAppConfig(configService),
      inject: [ConfigService],
    },
  ],
})
export class ApiGatewayModule {}
