import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  async getUsersWithParams(@Query() query: Object) {
    //  return await this.userService.getUsersWithParams(query);

    try {
      const users = await this.userService.getUsersWithParams(query);
      if (!users || users.length === 0) {
        throw new Error('No users found');
      }
      return users;
    } catch (error) {
      console.log(`Failed to retrieve users: ${error.message}`);
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getUser(@Param('id') id: string) {
    // return await this.userService.getUser(id);
    try {
      const user = await this.userService.getUser(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.log(`Failed to retrieve user: ${error.message}`);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addUser(@Body() createUserDto: CreateUserDto) {
    try {
      return await this.userService.addUser(createUserDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.userService.updateUser(id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    // return await this.userService.removeUser(id);
    try {
      const user = await this.userService.removeUser(id);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      console.log(`Failed to retrieve user: ${error.message}`);
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
