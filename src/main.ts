import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(3000);

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('Endpoints descriptions')
    .setVersion('1.0')
    .addTag('Tasks')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('document', app, document);
}
bootstrap();
