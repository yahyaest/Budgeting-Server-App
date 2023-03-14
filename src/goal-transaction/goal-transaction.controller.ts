import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';
import { CreateGoalTransactionsDto, UpdateGoalTransactionsDto } from './dto';
import { GoalTransactionService } from './goal-transaction.service';

@UseGuards(JwtGuard)
@Controller('api/goals-transactions')
export class GoalTransactionController {
  constructor(private readonly goalTransactionsService: GoalTransactionService) {}

  @Get('')
  async getGoals(@Query() query: Object) {
    try {
      return await this.goalTransactionsService.getGoalTransactionsWithParams(query);
    } catch (error) {
      throw new HttpException('No Goals found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getGoal(@Param('id') id: string) {
    try {
      const goalTransactions = await this.goalTransactionsService.getGoalTransactionsById(id);
      if (!goalTransactions) {
        throw new Error('Goal not found');
      }
      return goalTransactions;
    } catch (error) {
      throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addGoal(@Body() createGoalTransactionsDto: CreateGoalTransactionsDto) {
    try {
      return await this.goalTransactionsService.addGoalTransactions(createGoalTransactionsDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/:id')
  async updateGoal(
    @Param('id') id: string,
    @Body() updateGoalTransactionsDto: UpdateGoalTransactionsDto,
  ) {
    try {
      return await this.goalTransactionsService.updateGoalTransactions(id, updateGoalTransactionsDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async deleteGoal(@Param('id') id: string) {
    try {
      const goalTransactions = await this.goalTransactionsService.removeGoalTransactions(id);
      if (!goalTransactions) {
        throw new Error('Goal not found');
      }
      return goalTransactions;
    } catch (error) {
      throw new HttpException('Goal not found', HttpStatus.NOT_FOUND);
    }
  }
}
