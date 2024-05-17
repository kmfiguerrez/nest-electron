import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';

import { PrismaModule } from './prisma/prisma.module';

import { loggerMiddleware } from './common/middleware/logger.middleware';

import { ConfigModule } from "@nestjs/config";
import { EmployeesModule } from './employees/employees.module';



@Module({
  imports: [AuthModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), EmployeesModule],
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
