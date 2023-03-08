import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { BudgetService } from './budget.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budget')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Get('')
  async getBudgets(@Query() query: Object) {
    try {
      return await this.budgetService.getBudgetsWithParams(query);
    } catch (error) {
      throw new HttpException('No Budgets found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getBudget(@Param('id') id: string) {
    try {
      const budget = await this.budgetService.getBudgetById(id);
      if (!budget) {
        throw new Error('Budget not found');
      }
      return budget;
    } catch (error) {
      throw new HttpException('Budget not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  @Roles('ADMIN')
  async addBudget(@Body() createBudgetDto: CreateBudgetDto) {
    try {
      return await this.budgetService.addBudget(createBudgetDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/:id')
  @Roles('ADMIN')
  async updateBudget(
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ) {
    try {
      return await this.budgetService.updateBudget(id, updateBudgetDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  @Roles('ADMIN')
  async deleteBudget(@Param('id') id: string) {
    try {
      const budget = await this.budgetService.removeBudget(id);
      if (!budget) {
        throw new Error('Budget not found');
      }
      return budget;
    } catch (error) {
      throw new HttpException('Budget not found', HttpStatus.NOT_FOUND);
    }
  }
}
