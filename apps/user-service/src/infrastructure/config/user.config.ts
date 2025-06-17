import { ConfigService } from '@nestjs/config';

export const createUserConfig = (configService: ConfigService) =>
  ({
    grpc: {
      options: {
        package: 'user',
        protoPath: './proto/user.proto',
        url: configService.get('USER_SERVICE_URL', '0.0.0.0:50051'),
      },
    },
    db: {
      type: 'postgres' as const,
      host: configService.get('DB_HOST', 'localhost'),
      port: parseInt(configService.get('DB_PORT', '5432'), 10),
      username: configService.get('DB_USERNAME', 'postgres'),
      password: configService.get('DB_PASSWORD', 'postgres123'),
      database: configService.get('DB_NAME', 'user_service_db'),
      autoLoadEntities: true,
      synchronize:
        configService.get('NODE_ENV', 'development') !== 'production',
      logging: configService.get('NODE_ENV', 'development') === 'development',
    },
  }) as const;
