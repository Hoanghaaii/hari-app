import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AuthServiceModule } from './auth-service.module';
import { ConfigService } from '@nestjs/config';
import { createAuthConfig } from './infrastructure/config/auth.config';

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule); // Tạo ứng dụng tạm thời để lấy ConfigService
  const configService = app.get(ConfigService);
  const authConfig = createAuthConfig(configService);

  // Khởi tạo microservice với cấu hình từ authConfig
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      AuthServiceModule,
      {
        transport: Transport.GRPC,
        options: authConfig.grpc.options,
      },
    );

  await microservice.listen();
  console.log(
    `Auth Service (gRPC) is running on ${authConfig.grpc.options.url}`,
  );
}
bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
