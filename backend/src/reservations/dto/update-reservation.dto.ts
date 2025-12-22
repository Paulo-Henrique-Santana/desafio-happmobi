import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReservationDto {
  @ApiPropertyOptional({
    description: 'Status da reserva',
    example: 'COMPLETED',
    enum: ['PENDING', 'ACTIVE', 'COMPLETED', 'CANCELLED'],
  })
  status?: string;
}
