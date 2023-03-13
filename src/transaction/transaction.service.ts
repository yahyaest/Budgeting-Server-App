import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';

@Injectable()
export class TransactionService {
  constructor(private readonly prisma: PrismaService) {}

  async getTransactions() {
    return await this.prisma.transaction.findMany();
  }

  async getTransactionById(id: string) {
    return await this.prisma.transaction.findUnique({ where: { id: +id } });
  }

  async getTransactionsWithParams(query: Object) {
    return await this.prisma.transaction.findMany({ where: query });
  }

  async addTransaction(body: CreateTransactionDto) {
    return await this.prisma.transaction.create({ data: body });
  }

  async updateTransaction(id: string, body: UpdateTransactionDto) {
    return await this.prisma.transaction.update({
      where: { id: +id },
      data: body,
    });
  }

  async removeTransaction(id: string) {
    return await this.prisma.transaction.delete({ where: { id: +id } });
  }
}
