import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationsService } from './reservations.service';

@ApiTags('reservations')
@ApiBearerAuth()
@Controller('reservations')
@UseGuards(JwtAuthGuard)
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova reserva' })
  @ApiResponse({ status: 201, description: 'Reserva criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Veículo já reservado ou usuário já possui reserva ativa' })
  create(@Request() req, @Body() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(req.user.sub, createReservationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as reservas do usuário' })
  @ApiResponse({ status: 200, description: 'Lista de reservas' })
  findAll(@Request() req) {
    return this.reservationsService.findAll(req.user.sub);
  }

  @Get('active')
  @ApiOperation({ summary: 'Buscar reserva ativa do usuário' })
  @ApiResponse({ status: 200, description: 'Reserva ativa encontrada' })
  @ApiResponse({ status: 404, description: 'Nenhuma reserva ativa encontrada' })
  getUserActiveReservation(@Request() req) {
    return this.reservationsService.getUserActiveReservation(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar reserva por ID' })
  @ApiResponse({ status: 200, description: 'Reserva encontrada' })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada' })
  findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar reserva' })
  @ApiResponse({ status: 200, description: 'Reserva atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada' })
  update(
    @Param('id') id: string,
    @Request() req,
    @Body() updateReservationDto: UpdateReservationDto,
  ) {
    return this.reservationsService.update(
      id,
      req.user.sub,
      updateReservationDto,
    );
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancelar reserva' })
  @ApiResponse({ status: 200, description: 'Reserva cancelada com sucesso' })
  @ApiResponse({ status: 404, description: 'Reserva não encontrada' })
  cancel(@Param('id') id: string, @Request() req) {
    return this.reservationsService.cancel(id, req.user.sub);
  }
}
