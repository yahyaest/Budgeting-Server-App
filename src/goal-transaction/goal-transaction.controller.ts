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
import { CreateGoalTransactionsDto, UpdateGoalTransactionsDto } from './dto';
import { GoalTransactionService } from './goal-transaction.service';
import { CustomRequest } from 'src/user/models/request.models';

@UseGuards(JwtGuard)
@Controller('api/goals-transactions')
export class GoalTransactionController {
  constructor(
    private readonly goalTransactionsService: GoalTransactionService,
  ) {}

  @Get('')
  @UseGuards(DataAccessGuard)
  async getGoals(@Query() query: any, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      if (user.role !== 'ADMIN') {
        query.userId = user.id;
      }
      return await this.goalTransactionsService.getGoalTransactionsWithParams(
        query,
      );
    } catch (error) {
      throw new HttpException(
        'No GoalsTransactions found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Get('/:id')
  @UseGuards(DataAccessGuard)
  async getGoal(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const goalTransactions =
        await this.goalTransactionsService.getGoalTransactionsById(id);
      if (!goalTransactions) {
        throw new Error('GoalTransactions not found');
      }

      if (user.id !== goalTransactions.userId && user.role !== 'ADMIN') {
        throw new Error('GoalTransactions belong to another user');
      }
      return goalTransactions;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addGoal(@Body() createGoalTransactionsDto: CreateGoalTransactionsDto) {
    try {
      return await this.goalTransactionsService.addGoalTransactions(
        createGoalTransactionsDto,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @UseGuards(DataAccessGuard)
  async updateGoal(
    @Param('id') id: string,
    @Body() updateGoalTransactionsDto: UpdateGoalTransactionsDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const user = req.userObj;
      const goalTransactions =
        await this.goalTransactionsService.getGoalTransactionsById(id);

      if (!goalTransactions) {
        throw new Error('GoalTransactions not found');
      }

      if (user.id !== goalTransactions.userId && user.role !== 'ADMIN') {
        throw new Error('GoalTransactions belong to another user');
      }
      return await this.goalTransactionsService.updateGoalTransactions(
        id,
        updateGoalTransactionsDto,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @UseGuards(DataAccessGuard)
  async deleteGoal(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const goalTransactions =
        await this.goalTransactionsService.getGoalTransactionsById(id);

      if (!goalTransactions) {
        throw new Error('GoalTransactions not found');
      }

      if (user.id !== goalTransactions.userId && user.role !== 'ADMIN') {
        throw new Error('GoalTransactions belong to another user');
      }
      return this.goalTransactionsService.removeGoalTransactions(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
