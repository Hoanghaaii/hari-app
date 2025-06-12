import { NestFactory } from '@nestjs/core';
import { ReactionServiceModule } from './reaction-service.module';

async function bootstrap() {
  const app = await NestFactory.create(ReactionServiceModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
