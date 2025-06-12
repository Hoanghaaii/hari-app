import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { HealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./envs/.env.user', './envs/.env.shared'],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432') || 5432,
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres123',
      database: process.env.DB_NAME || 'user_service_db',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production', // Chỉ sync trong dev
      logging: process.env.NODE_ENV === 'development', // Log queries trong dev
    }),
    HealthModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserServiceModule {}
