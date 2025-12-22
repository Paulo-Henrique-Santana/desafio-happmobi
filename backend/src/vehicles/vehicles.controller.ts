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
import { AdminGuard } from '../auth/guards/admin.guard';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { FilterVehicleDto } from './dto/filter-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesService } from './vehicles.service';

@Controller('vehicles')
@UseGuards(AdminGuard)
export class VehiclesController {
  constructor(private service: VehiclesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  create(
    @Body() dto: CreateVehicleDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return this.service.create(dto, photo);
  }

  @Get()
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
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  update(
    @Param('id') id: string,
    @Body() dto: UpdateVehicleDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return this.service.update(id, dto, photo);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
