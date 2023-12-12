import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.createUser(createUserDto);
  }

  @Get('all')
  async findUsers(): Promise<User[]> {
    return await this.userService.findUsers();
  }

  @Put('update/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() newUserData: UpdateUserDto,
  ): Promise<User> {
    return await this.userService.updateUser(id, newUserData);
  }

  @Delete('delete/:id')
  async deleteUser(@Param('id') id: number): Promise<User> {
    return await this.userService.deleteUser(id);
  }
}
