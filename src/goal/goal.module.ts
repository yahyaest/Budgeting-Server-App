import { Module } from '@nestjs/common';
import { GoalController } from './goal.controller';
import { GoalService } from './goal.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [GoalController],
  providers: [GoalService],
  imports: [UserModule],
})
export class GoalModule {}
