import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { TransactionService } from './transaction.service';

@UseGuards(JwtGuard)
@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('')
  async getTransactions(@Query() query: Object) {
    try {
      return await this.transactionService.getTransactionsWithParams(query);
    } catch (error) {
      throw new HttpException('No Transactions found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getTransaction(@Param('id') id: string) {
    try {
      const transaction = await this.transactionService.getTransactionById(id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }
      return transaction;
    } catch (error) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      return await this.transactionService.addTransaction(createTransactionDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/:id')
  async updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    try {
      return await this.transactionService.updateTransaction(
        id,
        updateTransactionDto,
      );
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async deleteTransaction(@Param('id') id: string) {
    try {
      const transaction = await this.transactionService.removeTransaction(id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }
      return transaction;
    } catch (error) {
      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    }
  }
}
