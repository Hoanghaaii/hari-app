import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserGatewayController } from './presentation/controllers/user-gateway.controller';
import { AuthGatewayController } from './presentation/controllers/auth-gateway.controller';
import { HealthModule } from './infrastructure/health/health.module';
import { appConfig } from './infrastructure/config/app.config';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: appConfig.services.user.name,
        transport: Transport.GRPC,
        options: appConfig.services.user.options,
      },
      {
        name: appConfig.services.auth.name,
        transport: Transport.GRPC,
        options: appConfig.services.auth.options,
      },
    ]),
    HealthModule,
  ],
  controllers: [UserGatewayController, AuthGatewayController],
})
export class ApiGatewayModule {}
