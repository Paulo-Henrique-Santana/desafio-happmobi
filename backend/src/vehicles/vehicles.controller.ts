import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../auth/guards/admin.guard';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { FilterVehicleDto } from './dto/filter-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesService } from './vehicles.service';

@ApiTags('vehicles')
@Controller('vehicles')
export class VehiclesController {
  constructor(private service: VehiclesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Criar novo veículo (apenas admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'Veículo criado com sucesso' })
  @ApiResponse({ status: 403, description: 'Acesso negado' })
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() dto: CreateVehicleDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return this.service.create(dto, photo);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar veículos com filtros' })
  @ApiQuery({ name: 'name', required: false, description: 'Filtrar por nome' })
  @ApiQuery({ name: 'bodyTypes', required: false, description: 'Filtrar por tipos de carroceria (separados por vírgula)' })
  @ApiQuery({ name: 'engineTypes', required: false, description: 'Filtrar por tipos de motor (separados por vírgula)' })
  @ApiQuery({ name: 'seats', required: false, description: 'Filtrar por número de assentos (separados por vírgula)' })
  @ApiResponse({ status: 200, description: 'Lista de veículos' })
  @UseGuards(JwtAuthGuard)
  findAll(@Query() query: any) {
    const filters: FilterVehicleDto = {
      name: query.name,
      bodyTypes: query.bodyTypes ? query.bodyTypes.split(',') : undefined,
      engineTypes: query.engineTypes ? query.engineTypes.split(',') : undefined,
      seats: query.seats ? query.seats.split(',').map(Number) : undefined,
    };
    
    return this.service.findAll(filters);
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buscar veículo por ID' })
  @ApiResponse({ status: 200, description: 'Veículo encontrado' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar veículo (apenas admin)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Veículo atualizado com sucesso' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  @UseGuards(AdminGuard)
  @UseInterceptors(FileInterceptor('photo'))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateVehicleDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return this.service.update(id, dto, photo);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Deletar veículo (apenas admin)' })
  @ApiResponse({ status: 200, description: 'Veículo deletado com sucesso' })
  @ApiResponse({ status: 404, description: 'Veículo não encontrado' })
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
