import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { FilterVehicleDto } from './dto/filter-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    private prisma: PrismaService,
    private cloudinary: CloudinaryService,
  ) {}

  async create(data: CreateVehicleDto, photo?: Express.Multer.File) {
    let photoUrl: string | undefined;

    if (photo) {
      photoUrl = await this.cloudinary.uploadImage(photo);
    }

    return this.prisma.vehicle.create({
      data: {
        name: data.name,
        bodyType: data.bodyType,
        engineType: data.engineType,
        seats: Number(data.seats),
        photo: photoUrl,
      },
    });
  }

  async findAll(filters?: FilterVehicleDto) {
    const where: any = {};

    if (filters?.name) {
      where.name = {
        contains: filters.name,
        mode: 'insensitive',
      };
    }

    if (filters?.bodyTypes && filters.bodyTypes.length > 0) {
      where.bodyType = {
        in: filters.bodyTypes,
      };
    }

    if (filters?.engineTypes && filters.engineTypes.length > 0) {
      where.engineType = {
        in: filters.engineTypes,
      };
    }

    if (filters?.seats && filters.seats.length > 0) {
      where.seats = {
        in: filters.seats,
      };
    }

    return this.prisma.vehicle.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
    });

    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado');
    }

    return vehicle;
  }

  async update(id: string, data: UpdateVehicleDto, photo?: Express.Multer.File) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });

    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado');
    }

    let photoUrl: string | undefined;

    if (photo) {
      photoUrl = await this.cloudinary.uploadImage(photo);
    }

    const updatedData: any = { ...data };

    if (photoUrl) {
      updatedData.photo = photoUrl;
    }

    if (data.seats) {
      updatedData.seats = Number(data.seats);
    }

    return this.prisma.vehicle.update({
      where: { id },
      data: updatedData,
    });
  }

  async remove(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({ where: { id } });

    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado');
    }

    await this.prisma.vehicle.delete({ where: { id } });

    return { message: 'Veículo removido com sucesso' };
  }
}
