import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryBudgetDto, UpdateCategoryBudgetDto } from './dto';

@Injectable()
export class CategoryBudgetService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategoryBudgets() {
    return await this.prisma.categoryBudget.findMany();
  }

  async getCategoryBudgetById(id: string) {
    return await this.prisma.categoryBudget.findUnique({ where: { id: +id } });
  }

  async getCategoryBudgetsWithParams(query: Object) {
    return await this.prisma.categoryBudget.findMany({ where: query });
  }

  async addCategoryBudget(body: CreateCategoryBudgetDto) {
    return await this.prisma.categoryBudget.create({ data: body });
  }

  async updateCategoryBudget(id: string, body: UpdateCategoryBudgetDto) {
    return await this.prisma.categoryBudget.update({
      where: { id: +id },
      data: body,
    });
  }

  async removeCategoryBudget(id: string) {
    return await this.prisma.categoryBudget.delete({ where: { id: +id } });
  }
}
