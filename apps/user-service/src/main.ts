import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserServiceModule } from './user-service.module';

async function bootstrap() {
  // CHỈ tạo microservice, KHÔNG tạo HTTP server
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserServiceModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'user',
        protoPath: './proto/user.proto',
        url: '0.0.0.0:50051',
      },
    },
  );

  await app.listen();
  console.log('User Service (gRPC) is running on port 50051');
}
bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
