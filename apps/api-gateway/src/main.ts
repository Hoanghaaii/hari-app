import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { appConfig } from './infrastructure/config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  if (appConfig.cors.enabled) {
    app.enableCors({
      origin: appConfig.cors.origin,
    });
  }

  await app.listen(appConfig.port);
  console.log(`API Gateway is running on http://localhost:${appConfig.port}`);
}
bootstrap();
