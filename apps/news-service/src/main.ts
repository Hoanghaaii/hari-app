import { NestFactory } from '@nestjs/core';
import { NewsServiceModule } from './news-service.module';

async function bootstrap() {
  const app = await NestFactory.create(NewsServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
