import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { UsersModule } from './users/users.module';
import { VehiclesModule } from './vehicles/vehicles.module';

@Module({
  imports: [UsersModule, AuthModule, VehiclesModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
