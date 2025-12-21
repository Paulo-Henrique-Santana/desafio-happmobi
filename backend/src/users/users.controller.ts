import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Post()
  @UseInterceptors(FileInterceptor('photo'))
  createUser(
    @Body() dto: CreateUserDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return this.service.create(dto, photo);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('photo'))
  updateUser(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @UploadedFile() photo?: Express.Multer.File,
  ) {
    return this.service.update(id, dto, photo);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
