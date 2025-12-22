import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createReservationDto: CreateReservationDto) {
    const { vehicleId } = createReservationDto;

    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      throw new NotFoundException('Veículo não encontrado');
    }

    const userActiveReservation = await this.prisma.reservation.findFirst({
      where: {
        userId,
        status: 'active',
      },
    });

    if (userActiveReservation) {
      throw new BadRequestException(
        'Você já possui uma reserva ativa. Cancele ou complete a reserva atual antes de fazer uma nova.',
      );
    }

    const vehicleReservation = await this.prisma.reservation.findFirst({
      where: {
        vehicleId,
        status: 'active',
      },
    });

    if (vehicleReservation) {
      throw new BadRequestException(
        'Este veículo já está reservado',
      );
    }

    return this.prisma.reservation.create({
      data: {
        userId,
        vehicleId,
        status: 'active',
      },
      include: {
        vehicle: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
          },
        },
      },
    });
  }

  async findAll(userId?: string) {
    const where = userId ? { userId } : {};

    return this.prisma.reservation.findMany({
      where,
      include: {
        vehicle: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
      include: {
        vehicle: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
          },
        },
      },
    });

    if (!reservation) {
      throw new NotFoundException('Reserva não encontrada');
    }

    return reservation;
  }

  async update(
    id: string,
    userId: string,
    updateReservationDto: UpdateReservationDto,
  ) {
    const reservation = await this.prisma.reservation.findUnique({
      where: { id },
    });

    if (!reservation) {
      throw new NotFoundException('Reserva não encontrada');
    }

    if (reservation.userId !== userId) {
      throw new BadRequestException(
        'Você não tem permissão para atualizar esta reserva',
      );
    }

    return this.prisma.reservation.update({
      where: { id },
      data: updateReservationDto,
      include: {
        vehicle: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            photo: true,
          },
        },
      },
    });
  }

  async cancel(id: string, userId: string) {
    return this.update(id, userId, { status: 'cancelled' });
  }

  async getUserActiveReservation(userId: string) {
    return this.prisma.reservation.findFirst({
      where: {
        userId,
        status: 'active',
      },
      include: {
        vehicle: true,
      },
    });
  }
}
