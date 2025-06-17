import { ConfigService } from '@nestjs/config';

export const createAppConfig = (configService: ConfigService) =>
  ({
    port: parseInt(configService.get('PORT', '3000'), 10),
    services: {
      user: {
        name: 'USER_SERVICE',
        transport: 'GRPC',
        options: {
          package: 'user',
          protoPath: './proto/user.proto',
          url: configService.get('USER_SERVICE_URL', 'localhost:50051'),
        },
      },
      auth: {
        name: 'AUTH_SERVICE',
        transport: 'GRPC',
        options: {
          package: 'auth',
          protoPath: './proto/auth.proto',
          url: configService.get('AUTH_SERVICE_URL', 'localhost:50052'),
        },
      },
    },
    cors: {
      enabled: configService.get('CORS_ENABLED', 'false') === 'true',
      origin: configService.get('CORS_ORIGIN')
        ? configService.get('CORS_ORIGIN').split(',')
        : undefined,
    },
  }) as const;
