import { ConfigService } from '@nestjs/config';

export const createAuthConfig = (configService: ConfigService) =>
  ({
    grpc: {
      options: {
        package: 'auth',
        protoPath: './apps/auth-service/src/infrastructure/proto/auth.proto',
        url: configService.get('AUTH_SERVICE_URL', '0.0.0.0:50052'),
      },
    },
    db: {
      type: 'postgres' as const,
      host: configService.get('DB_HOST', 'localhost'),
      port: parseInt(configService.get('DB_PORT', '5433'), 10),
      username: configService.get('DB_USERNAME', 'postgres'),
      password: configService.get('DB_PASSWORD', 'postgres123'),
      database: configService.get('DB_NAME', 'auth_service_db'),
      autoLoadEntities: true,
      synchronize:
        configService.get('NODE_ENV', 'development') !== 'production',
      logging: configService.get('NODE_ENV', 'development') === 'development',
    },
    jwt: {
      secret: configService.get('JWT_SECRET', 'your-super-secret-key'),
      expiration: parseInt(configService.get('JWT_EXPIRATION', '3600'), 10),
    },
  }) as const;
