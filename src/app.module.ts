import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

import { PrismaModule } from './prisma/prisma.module';

import { loggerMiddleware } from './common/middleware/logger.middleware';



@Module({
  imports: [AuthModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(loggerMiddleware)
    .forRoutes(AuthController)
  }
}
