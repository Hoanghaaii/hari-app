import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { UserGatewayController } from './presentation/controllers/user-gateway.controller';
import { AuthGatewayController } from './presentation/controllers/auth-gateway.controller';
import { HealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: './proto/user.proto',
          url: 'localhost:50051',
        },
      },
      {
        name: 'AUTH_SERVICE',
        transport: Transport.GRPC,
        options: {
          package: 'auth',
          protoPath: './proto/auth.proto',
          url: 'localhost:50052',
        },
      },
    ]),
    HealthModule,
  ],
  controllers: [UserGatewayController, AuthGatewayController],
})
export class ApiGatewayModule {}
