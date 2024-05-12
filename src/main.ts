import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // user for class validator.
  app.useGlobalPipes(new ValidationPipe({
    // Strip out prop not defined in dto.
    whitelist: true
  }))
  app.enableCors({
    // origin: "http://localhost:3000"
    
    origin: "app://-"

  })
  await app.listen(8080);
}
bootstrap();
