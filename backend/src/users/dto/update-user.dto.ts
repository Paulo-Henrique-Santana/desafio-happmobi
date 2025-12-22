import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'Nome do usuário',
    example: 'João Silva',
  })
  name?: string;

  @ApiPropertyOptional({
    description: 'Email do usuário',
    example: 'joao@exemplo.com',
  })
  email?: string;

  @ApiPropertyOptional({
    description: 'Senha do usuário',
    example: 'senha123',
  })
  password?: string;

  @ApiPropertyOptional({
    description: 'URL da foto do usuário',
    example: 'https://example.com/photo.jpg',
  })
  photo?: string;
}
