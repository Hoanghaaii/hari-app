import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './presentation/controllers/user.controller';
import { UserService } from './application/services/user.service';
import { HealthModule } from './infrastructure/health/health.module';
import { createUserConfig } from './infrastructure/config/user.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./envs/.env.user', './envs/.env.shared'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const appConfig = createUserConfig(configService);
        return appConfig.db;
      },
      inject: [ConfigService],
    }),
    HealthModule,
  ],
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'APP_CONFIG',
      useFactory: (configService: ConfigService) =>
        createUserConfig(configService),
      inject: [ConfigService],
    },
  ],
})
export class UserServiceModule {}
