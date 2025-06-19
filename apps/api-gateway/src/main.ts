import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { createAppConfig } from './config/app.config';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);
  const configService = app.get(ConfigService);
  const appConfig = createAppConfig(configService);

  if (appConfig.cors.enabled) {
    app.enableCors({
      origin: appConfig.cors.origin,
    });
  }

  await app.listen(appConfig.port);
  console.log(`API Gateway is running on http://localhost:${appConfig.port}`);
}
bootstrap();
