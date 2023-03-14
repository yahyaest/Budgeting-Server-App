import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CreateReminderDto, UpdateReminderDto } from 'src/reminder/dto';
import { ReminderService } from './reminder.service';

@UseGuards(JwtGuard)
@Controller('api/reminders')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get('')
  async getReminders(@Query() query: Object) {
    try {
      return await this.reminderService.getRemindersWithParams(query);
    } catch (error) {
      throw new HttpException('No Reminders found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getReminder(@Param('id') id: string) {
    try {
      const reminder = await this.reminderService.getReminderById(id);
      if (!reminder) {
        throw new Error('Reminder not found');
      }
      return reminder;
    } catch (error) {
      throw new HttpException('Reminder not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addReminder(@Body() createReminderDto: CreateReminderDto) {
    try {
      return await this.reminderService.addReminder(createReminderDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/:id')
  async updateReminder(
    @Param('id') id: string,
    @Body() updateReminderDto: UpdateReminderDto,
  ) {
    try {
      return await this.reminderService.updateReminder(id, updateReminderDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async deleteReminder(@Param('id') id: string) {
    try {
      const reminder = await this.reminderService.removeReminder(id);
      if (!reminder) {
        throw new Error('Reminder not found');
      }
      return reminder;
    } catch (error) {
      throw new HttpException('Reminder not found', HttpStatus.NOT_FOUND);
    }
  }
}
