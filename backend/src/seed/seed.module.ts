import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { SeedService } from './seed.service';

@Module({
  imports: [PrismaModule],
  providers: [SeedService]
})
export class SeedModule {}
