import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.enableCors();
  await app.listen(3000);
  console.log('API Gateway is running on http://localhost:3000');
}
bootstrap();
