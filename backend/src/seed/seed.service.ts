import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.createAdminUser();
  }

  private async createAdminUser() {
    const adminEmail = process.env.ADMIN_EMAIL!;
    const adminPassword = process.env.ADMIN_PASSWORD!;

    const adminExists = await this.prisma.user.findUnique({
      where: { email: adminEmail },
    });

    if (adminExists) {
      this.logger.log('Usuário admin já existe');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await this.prisma.user.create({
      data: {
        name: 'Administrador',
        email: adminEmail,
        password: hashedPassword,
        isAdmin: true,
      },
    });

    this.logger.log('Usuário admin criado com sucesso');
  }
}
