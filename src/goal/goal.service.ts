import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGoalDto, UpdateGoalDto } from './dto';

@Injectable()
export class GoalService {
  constructor(private readonly prisma: PrismaService) {}

  async getGoals() {
    return await this.prisma.goal.findMany();
  }

  async getGoalById(id: string) {
    return await this.prisma.goal.findUnique({ where: { id: +id } });
  }

  async getGoalsWithParams(query: Object) {
    return await this.prisma.goal.findMany({ where: query });
  }

  async addGoal(body: CreateGoalDto) {
    return await this.prisma.goal.create({ data: body });
  }

  async updateGoal(id: string, body: UpdateGoalDto) {
    return await this.prisma.goal.update({
      where: { id: +id },
      data: body,
    });
  }

  async removeGoal(id: string) {
    return await this.prisma.goal.delete({ where: { id: +id } });
  }
}
