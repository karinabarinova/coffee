import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {ValidationPipe} from '@nestjs/common';
import {HttpExceptionFilter} from './common/filters/http-exception/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, //removes properties not listed in corresponding DTOs
    transform: true, //transforms payload to its corresponding type, make primitive types conversion
    forbidNonWhitelisted: true, //throws an error if any non whitelisted properties are present
    transformOptions: {
      enableImplicitConversion: true
    }
  }))
  app.useGlobalFilters(new HttpExceptionFilter())
  await app.listen(3000);
}
bootstrap();
