import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './module/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get<string>('port')) || 3000;
  const apiVersion = configService.get<string>('api_version') ?? '0.0.1';
  const swaggerPath = 'api';

  const config = new DocumentBuilder()
    .setTitle('Detail Pro Mobile API')
    .setDescription(
      [
        'Backend API for the Detail Pro mobile app.',
        'The API handles user registration and login, JWT token issuing, profile management, and detailing orders.',
        'Protected endpoints use Bearer auth. Pass the accessToken from /auth/login or /auth/registration in the Authorization header.',
      ].join('\n\n'),
    )
    .setVersion(apiVersion)
    .addServer(`http://localhost:${port}`, 'Local development')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Enter the accessToken in this format: Bearer <token>.',
        in: 'header',
      },
      'JWT-auth',
    )
    .addTag('Auth', 'Registration, login, and JWT refresh.')
    .addTag('Users', 'User profile and account operations.')
    .addTag('Orders', 'Create, retrieve, and update detailing orders.')
    .addTag('Health', 'Basic application availability check.')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup(swaggerPath, app, document, {
    customSiteTitle: `Detail Pro Mobile API v${apiVersion}`,
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'method',
    },
  });

  await app.listen(port);
}

void bootstrap();
