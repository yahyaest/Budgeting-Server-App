import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGoalTransactionsDto, UpdateGoalTransactionsDto } from './dto';

@Injectable()
export class GoalTransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async getGoalsTransactions() {
    return await this.prisma.goalTransaction.findMany();
  }

  async getGoalTransactionsById(id: string) {
    return await this.prisma.goalTransaction.findUnique({ where: { id: +id } });
  }

  async getGoalTransactionsWithParams(query: Object) {
    return await this.prisma.goalTransaction.findMany({ where: query });
  }

  async addGoalTransactions(body: CreateGoalTransactionsDto) {
    return await this.prisma.goalTransaction.create({ data: body });
  }

  async updateGoalTransactions(id: string, body: UpdateGoalTransactionsDto) {
    return await this.prisma.goalTransaction.update({
      where: { id: +id },
      data: body,
    });
  }

  async removeGoalTransactions(id: string) {
    return await this.prisma.goalTransaction.delete({ where: { id: +id } });
  }
}
