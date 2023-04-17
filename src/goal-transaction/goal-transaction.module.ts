import { Module } from '@nestjs/common';
import { GoalTransactionController } from './goal-transaction.controller';
import { GoalTransactionService } from './goal-transaction.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [GoalTransactionController],
  providers: [GoalTransactionService],
  imports: [UserModule],
})
export class GoalTransactionModule {}
