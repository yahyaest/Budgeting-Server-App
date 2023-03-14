import { Module } from '@nestjs/common';
import { GoalTransactionController } from './goal-transaction.controller';
import { GoalTransactionService } from './goal-transaction.service';

@Module({
  controllers: [GoalTransactionController],
  providers: [GoalTransactionService]
})
export class GoalTransactionModule {}
