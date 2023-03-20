import { Module } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [BudgetService],
  controllers: [BudgetController],
  imports:[UserModule]
})
export class BudgetModule {}
