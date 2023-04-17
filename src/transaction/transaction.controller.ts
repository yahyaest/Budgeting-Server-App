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
  Req,
  UseGuards,
} from '@nestjs/common';
import { DataAccessGuard, JwtGuard } from 'src/auth/guard';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { TransactionService } from './transaction.service';
import { CustomRequest } from 'src/user/models/request.models';

@UseGuards(JwtGuard)
@Controller('api/transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('')
  @UseGuards(DataAccessGuard)
  async getTransactions(@Query() query: any, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      if (user.role !== 'ADMIN') {
        query.userId = user.id;
      }
      return await this.transactionService.getTransactionsWithParams(query);
    } catch (error) {
      throw new HttpException('No Transactions found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  @UseGuards(DataAccessGuard)
  async getTransaction(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const transaction = await this.transactionService.getTransactionById(id);
      if (!transaction) {
        throw new Error('Transaction not found');
      }
      if (user.id !== transaction.userId && user.role !== 'ADMIN') {
        throw new Error('Transaction belong to another user');
      }
      return transaction;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    try {
      return await this.transactionService.addTransaction(createTransactionDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @UseGuards(DataAccessGuard)
  async updateTransaction(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const user = req.userObj;
      const transaction = await this.transactionService.getTransactionById(id);

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      if (user.id !== transaction.userId && user.role !== 'ADMIN') {
        throw new Error('Transaction belong to another user');
      }
      return await this.transactionService.updateTransaction(
        id,
        updateTransactionDto,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @UseGuards(DataAccessGuard)
  async deleteTransaction(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const transaction = await this.transactionService.getTransactionById(id);

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      if (user.id !== transaction.userId && user.role !== 'ADMIN') {
        throw new Error('Transaction belong to another user');
      }
      return await this.transactionService.removeTransaction(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
