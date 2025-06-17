export const appConfig = {
  port: parseInt(process.env.API_GATEWAY_PORT || '3000', 10),
  services: {
    user: {
      name: 'USER_SERVICE',
      transport: 'GRPC',
      options: {
        package: 'user',
        protoPath: './proto/user.proto',
        url: process.env.USER_SERVICE_URL || 'localhost:50051',
      },
    },
    auth: {
      name: 'AUTH_SERVICE',
      transport: 'GRPC',
      options: {
        package: 'auth',
        protoPath: './proto/auth.proto',
        url: process.env.AUTH_SERVICE_URL || 'localhost:50052',
      },
    },
  },
  cors: {
    enabled: process.env.CORS_ENABLED === 'true',
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : undefined,
  },
} as const; 