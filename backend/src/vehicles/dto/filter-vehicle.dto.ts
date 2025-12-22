import { ApiPropertyOptional } from '@nestjs/swagger';

export class FilterVehicleDto {
  @ApiPropertyOptional({
    description: 'Filtrar por nome do veículo',
    example: 'Tesla',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Filtrar por tipos de carroceria (separados por vírgula)',
    example: ['Sedan', 'SUV'],
    isArray: true,
  })
  bodyTypes?: string[];

  @ApiPropertyOptional({
    description: 'Filtrar por tipos de motor (separados por vírgula)',
    example: ['Elétrico', 'Gasolina'],
    isArray: true,
  })
  engineTypes?: string[];

  @ApiPropertyOptional({
    description: 'Filtrar por número de assentos (separados por vírgula)',
    example: [5, 7],
    isArray: true,
    type: [Number],
  })
  seats?: number[];
}
