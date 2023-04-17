import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
  imports: [UserModule],
})
export class TransactionModule {}
