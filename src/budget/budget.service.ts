import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateBudgetDto, UpdateBudgetDto } from './dto';

@Injectable()
export class BudgetService {
  constructor(private readonly prisma: PrismaService) {}

  async getBudgets() {
    return await this.prisma.budget.findMany();
  }

  async getBudgetById(id: string) {
    return await this.prisma.budget.findUnique({ where: { id: +id } });
  }

  async getBudgetsWithParams(query: Object) {
    return await this.prisma.budget.findMany({ where: query });
  }

  async addBudget(body: CreateBudgetDto) {
    return await this.prisma.budget.create({ data: body });
  }

  async updateBudget(id: string, body: UpdateBudgetDto) {
    return await this.prisma.budget.update({
      where: { id: +id },
      data: body,
    });
  }

  async removeBudget(id: string) {
    return await this.prisma.budget.delete({ where: { id: +id } });
  }
}
