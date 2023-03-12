import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { BudgetService } from './budget.service';
import { CreateBudgetDto, UpdateBudgetDto } from './dto';

@UseGuards(JwtGuard)
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
