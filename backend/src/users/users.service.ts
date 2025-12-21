import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(data: CreateUserDto, photo?: Express.Multer.File) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingUser) {
      throw new ConflictException('Email já está em uso');
    }

    let photoUrl: string | undefined;

    if (photo) {
      photoUrl = await this.cloudinary.uploadImage(photo);
    }

    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(data.password, saltRounds);

    return this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        photo: photoUrl,
      },
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, data: UpdateUserDto, photo?: Express.Multer.File) {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (data.email && data.email !== user.email) {
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        throw new ConflictException('Email já está em uso');
      }
    }

    let photoUrl: string | undefined;

    if (photo) {
      photoUrl = await this.cloudinary.uploadImage(photo);
    }

    const updatedData = { ...data };
    let hashedPassword: string | undefined;

    if (data.password) {
      const saltRounds = 10;
      hashedPassword = await bcrypt.hash(data.password, saltRounds);
      updatedData.password = hashedPassword;
    }

    return this.prisma.user.update({
      where: { id },
      data: updatedData,
      select: {
        id: true,
        name: true,
        email: true,
        photo: true,
      },
    });
  }
}
