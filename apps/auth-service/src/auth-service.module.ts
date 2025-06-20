import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './application/services/auth.service';
import { HealthModule } from './infrastructure/health/health.module';
import { createAuthConfig } from './infrastructure/config/auth.config';
import { AuthGrpcController } from './presentation/grpc/user.grpc.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['./envs/.env.auth', './envs/.env.shared'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const authConfig = createAuthConfig(configService);
        return authConfig.db;
      },
      inject: [ConfigService],
    }),
    HealthModule,
  ],
  controllers: [AuthGrpcController],
  providers: [
    AuthService,
    {
      provide: 'AUTH_CONFIG',
      useFactory: (configService: ConfigService) =>
        createAuthConfig(configService),
      inject: [ConfigService],
    },
  ],
})
export class AuthServiceModule {}
