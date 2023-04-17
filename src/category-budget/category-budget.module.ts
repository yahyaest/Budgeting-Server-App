import { Module } from '@nestjs/common';
import { CategoryBudgetService } from './category-budget.service';
import { CategoryBudgetController } from './category-budget.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [CategoryBudgetService],
  controllers: [CategoryBudgetController],
  imports: [UserModule],
})
export class CategoryBudgetModule {}
