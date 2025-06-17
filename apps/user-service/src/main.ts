import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { UserServiceModule } from './user-service.module';
import { ConfigService } from '@nestjs/config';
import { createUserConfig } from './infrastructure/config/user.config';

async function bootstrap() {
  const app = await NestFactory.create(UserServiceModule); // Tạo ứng dụng tạm thời để lấy ConfigService
  const configService = app.get(ConfigService);
  const userConfig = createUserConfig(configService);

  // Khởi tạo microservice với cấu hình từ userConfig
  const microservice =
    await NestFactory.createMicroservice<MicroserviceOptions>(
      UserServiceModule,
      {
        transport: Transport.GRPC,
        options: userConfig.grpc.options,
      },
    );

  await microservice.listen();
  console.log(
    `User Service (gRPC) is running on ${userConfig.grpc.options.url}`,
  );
}
bootstrap().catch((error) => {
  console.error('Failed to start application:', error);
  process.exit(1);
});
