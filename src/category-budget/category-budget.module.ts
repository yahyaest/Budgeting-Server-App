import { Module } from '@nestjs/common';
import { CategoryBudgetService } from './category-budget.service';
import { CategoryBudgetController } from './category-budget.controller';

@Module({
  providers: [CategoryBudgetService],
  controllers: [CategoryBudgetController]
})
export class CategoryBudgetModule {}
