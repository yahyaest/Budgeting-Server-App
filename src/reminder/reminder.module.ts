import { Module } from '@nestjs/common';
import { ReminderController } from './reminder.controller';
import { ReminderService } from './reminder.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [ReminderController],
  providers: [ReminderService],
  imports: [UserModule],
})
export class ReminderModule {}
