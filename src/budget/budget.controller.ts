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
import { CustomRequest } from 'src/user/models/request.models';
import { BudgetService } from './budget.service';
import { CreateBudgetDto, UpdateBudgetDto } from './dto';

@UseGuards(JwtGuard)
@Controller('api/budgets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get('')
  @UseGuards(DataAccessGuard)
  async getBudgets(@Query() query: any, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      if (user.role === 'ADMIN') {
        return await this.budgetService.getBudgetsWithParams(query);
      } else {
        query.userId = user.id;
        return await this.budgetService.getBudgetsWithParams(query);
      }
    } catch (error) {
      console.log(error);
      throw new HttpException('No Budgets found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  @UseGuards(DataAccessGuard)
  async getBudget(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const budget = await this.budgetService.getBudgetById(id);
      if (!budget) {
        throw new Error('Budget not found');
      }
      if (user.id !== budget.userId && user.role !== 'ADMIN') {
        throw new Error('Budget belong to another user');
      }
      return budget;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addBudget(@Body() createBudgetDto: CreateBudgetDto) {
    try {
      return await this.budgetService.addBudget(createBudgetDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  @UseGuards(DataAccessGuard)
  async updateBudget(
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const user = req.userObj;
      const budget = await this.budgetService.getBudgetById(id);

      if (!budget) {
        throw new Error('Budget not found');
      }

      if (user.id !== budget.userId && user.role !== 'ADMIN') {
        throw new Error('Budget belong to another user');
      }
      return await this.budgetService.updateBudget(id, updateBudgetDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @UseGuards(DataAccessGuard)
  async deleteBudget(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const budget = await this.budgetService.getBudgetById(id);

      if (!budget) {
        throw new Error('Budget not found');
      }
      if (user.id !== budget.userId && user.role !== 'ADMIN') {
        throw new Error('Budget belong to another user');
      }
      return await this.budgetService.removeBudget(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
