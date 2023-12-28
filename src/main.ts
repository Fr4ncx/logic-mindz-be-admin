import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { fastifyHelmet } from '@fastify/helmet';
import { AppModule } from './app/AppModule';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import * as fastifyCors from '@fastify/cors';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PaginatedResponseDto } from './common/dto/paginated.dto';
import { Logger } from 'nestjs-pino';
import { ErrorExceptionFilter } from './common/http-exception/error-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ logger: true }));
  app.useLogger(app.get(Logger));
  await app.register(fastifyHelmet);

  app.use(morgan('tiny'));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.useGlobalFilters(new ErrorExceptionFilter());
  await app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'PUT', 'PATCH', 'OPTIONS', 'POST', 'DELETE'],
  });
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Logic mindz')
      .setDescription('Logic mindz APIs')
      .setVersion('1.0')
      .addBearerAuth(
        {
          description: `[just text field] Please enter token in following format: Bearer <JWT>`,
          name: 'Authorization',
          bearerFormat: 'Bearer',
          scheme: 'Bearer',
          type: 'http',
          in: 'Header',
        },
        'Authorization',
      )
      .build();
    const document = SwaggerModule.createDocument(app, config, {
      extraModels: [PaginatedResponseDto],
    });
    SwaggerModule.setup('apis', app, document);
  }
  await app.listen(process.env.SERVER_PORT || 3300, '0.0.0.0');
}

bootstrap();
