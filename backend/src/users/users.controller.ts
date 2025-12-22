import {
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar novo usuário' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @UseInterceptors(FileInterceptor('photo'))
  createUser(
    @Body() dto: CreateUserDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return this.service.create(dto, photo);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar usuário' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return this.service.update(id, dto, photo);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar usuário' })
  @ApiResponse({ status: 200, description: 'Usuário deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado' })
  @UseGuards(JwtAuthGuard)
  removeUser(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
