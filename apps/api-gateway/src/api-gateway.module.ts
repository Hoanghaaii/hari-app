import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserGatewayController } from './presentation/controllers/user-gateway.controller';
import { AuthGatewayController } from './presentation/controllers/auth-gateway.controller';
import { HealthModule } from './infrastructure/health/health.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createAppConfig } from './infrastructure/config/app.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./envs/.env.api-gateway', './envs/.env.shared'],
      isGlobal: true,
    }),
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
    HealthModule,
  ],
  controllers: [UserGatewayController, AuthGatewayController],
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
