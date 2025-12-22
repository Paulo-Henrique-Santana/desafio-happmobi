import { ApiProperty } from '@nestjs/swagger';

export class CreateReservationDto {
  @ApiProperty({
    description: 'ID do veículo a ser reservado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  vehicleId: string;
}
