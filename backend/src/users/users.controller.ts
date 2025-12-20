import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateUserDto } from './dto/create-user.dto';
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
}
