import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthServiceModule } from './auth-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: './proto/auth.proto',
        url: '0.0.0.0:50052',
      },
    },
  );

  await app.listen();
  console.log('Auth Service (gRPC) is running on port 50052');
}
bootstrap();
