import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('API de Reserva de Veículos')
    .setDescription('API para gerenciamento de veículos e reservas')
    .setVersion('1.0')
    .addTag('auth', 'Autenticação de usuários')
    .addTag('users', 'Gerenciamento de usuários')
    .addTag('vehicles', 'Gerenciamento de veículos')
    .addTag('reservations', 'Gerenciamento de reservas')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
