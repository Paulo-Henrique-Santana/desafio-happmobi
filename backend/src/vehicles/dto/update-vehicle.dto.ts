import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateVehicleDto {
  @ApiPropertyOptional({
    description: 'Nome do veículo',
    example: 'Tesla Model 3',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Tipo de carroceria',
    example: 'Sedan',
  })
  bodyType?: string;

  @ApiPropertyOptional({
    description: 'Tipo de motor',
    example: 'Elétrico',
  })
  engineType?: string;

  @ApiPropertyOptional({
    description: 'Número de assentos',
    example: 5,
  })
  seats?: number;
}
