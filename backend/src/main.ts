import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS
  app.enableCors({
    origin: configService.get('CORS_ORIGIN') || 'http://localhost:3000',
    credentials: true,
  });

  // Global prefix
  app.setGlobalPrefix(configService.get('API_PREFIX') || 'api/v1');

  // Validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Agnigna Gna API')
    .setDescription('API de la plateforme immobilière Agnigna Gna')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentification')
    .addTag('properties', 'Propriétés')
    .addTag('users', 'Utilisateurs')
    .addTag('contacts', 'Messages de contact')
    .addTag('transactions', 'Transactions')
    .addTag('admin', 'Administration')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = configService.get('PORT') || 3001;
  await app.listen(port);

  console.log(`
  ╔══════════════════════════════════════════════╗
  ║                                              ║
  ║   🚀 Agnigna Gna Backend API                ║
  ║                                              ║
  ║   📍 Server:  http://localhost:${port}        ║
  ║   📚 Docs:    http://localhost:${port}/api/docs ║
  ║   🌍 Env:     ${configService.get('NODE_ENV')}           ║
  ║                                              ║
  ╚══════════════════════════════════════════════╝
  `);
}
bootstrap();
