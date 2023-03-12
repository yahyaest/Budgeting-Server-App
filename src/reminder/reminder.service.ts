import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReminderDto, UpdateReminderDto } from './dto';

@Injectable()
export class ReminderService {
  constructor(private readonly prisma: PrismaService) {}

  async getReminders() {
    return await this.prisma.reminder.findMany();
  }

  async getReminderById(id: string) {
    return await this.prisma.reminder.findUnique({ where: { id: +id } });
  }

  async getRemindersWithParams(query: Object) {
    return await this.prisma.reminder.findMany({ where: query });
  }

  async addReminder(body: CreateReminderDto) {
    return await this.prisma.reminder.create({ data: body });
  }

  async updateReminder(id: string, body: UpdateReminderDto) {
    return await this.prisma.reminder.update({
      where: { id: +id },
      data: body,
    });
  }

  async removeReminder(id: string) {
    return await this.prisma.reminder.delete({ where: { id: +id } });
  }
}
