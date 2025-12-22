import { ApiProperty } from '@nestjs/swagger';

export class CreateVehicleDto {
  @ApiProperty({
    description: 'Nome do veículo',
    example: 'Tesla Model 3',
  })
  name: string;

  @ApiProperty({
    description: 'Tipo de carroceria',
    example: 'Sedan',
  })
  bodyType: string;

  @ApiProperty({
    description: 'Tipo de motor',
    example: 'Elétrico',
  })
  engineType: string;

  @ApiProperty({
    description: 'Número de assentos',
    example: 5,
  })
  seats: number;
}
