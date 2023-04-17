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
  Req,
  UseGuards,
} from '@nestjs/common';
import { DataAccessGuard, JwtGuard } from 'src/auth/guard';
import { CreateReminderDto, UpdateReminderDto } from 'src/reminder/dto';
import { ReminderService } from './reminder.service';
import { CustomRequest } from 'src/user/models/request.models';

@UseGuards(JwtGuard)
@Controller('api/reminders')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get('')
  @UseGuards(DataAccessGuard)
  async getReminders(@Query() query: any, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      if (user.role !== 'ADMIN') {
        query.userId = user.id;
      }
      return await this.reminderService.getRemindersWithParams(query);
    } catch (error) {
      console.log(error);
      throw new HttpException('No Reminders found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  @UseGuards(DataAccessGuard)
  async getReminder(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const reminder = await this.reminderService.getReminderById(id);
      if (!reminder) {
        throw new Error('Reminder not found');
      }
      if (user.id !== reminder.userId && user.role !== 'ADMIN') {
        throw new Error('Reminder belong to another user');
      }
      return reminder;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addReminder(@Body() createReminderDto: CreateReminderDto) {
    try {
      return await this.reminderService.addReminder(createReminderDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @UseGuards(DataAccessGuard)
  async updateReminder(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const user = req.userObj;
      const reminder = await this.reminderService.getReminderById(id);

      if (!reminder) {
        throw new Error('Reminder not found');
      }

      if (user.id !== reminder.userId && user.role !== 'ADMIN') {
        throw new Error('Reminder belong to another user');
      }
      return await this.reminderService.updateReminder(id, updateReminderDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @UseGuards(DataAccessGuard)
  async deleteReminder(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const reminder = await this.reminderService.getReminderById(id);

      if (!reminder) {
        throw new Error('Reminder not found');
      }

      if (user.id !== reminder.userId && user.role !== 'ADMIN') {
        throw new Error('Reminder belong to another user');
      }
      return await this.reminderService.removeReminder(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
