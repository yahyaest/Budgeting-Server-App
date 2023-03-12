import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common';
import { Roles } from 'src/auth/decorator';
import { CategoryBudgetService } from './category-budget.service';
import { CreateCategoryBudgetDto, UpdateCategoryBudgetDto } from './dto';

@Controller('category-budget')
export class CategoryBudgetController {
  constructor(private readonly categoryBudgetService: CategoryBudgetService) {}

  @Get('')
  async getCategoryBudgets(@Query() query: Object) {
    try {
      return await this.categoryBudgetService.getCategoryBudgetsWithParams(query);
    } catch (error) {
      throw new HttpException('No CategoryBudgets found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getCategoryBudget(@Param('id') id: string) {
    try {
      const categoryBudget = await this.categoryBudgetService.getCategoryBudgetById(id);
      if (!categoryBudget) {
        throw new Error('CategoryBudget not found');
      }
      return categoryBudget;
    } catch (error) {
      throw new HttpException('CategoryBudget not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  @Roles('ADMIN')
  async addCategoryBudget(@Body() createCategoryBudgetDto: CreateCategoryBudgetDto) {
    try {
      return await this.categoryBudgetService.addCategoryBudget(createCategoryBudgetDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/:id')
  @Roles('ADMIN')
  async updateCategoryBudget(
    @Param('id') id: string,
    @Body() updateCategoryBudgetDto: UpdateCategoryBudgetDto,
  ) {
    try {
      return await this.categoryBudgetService.updateCategoryBudget(id, updateCategoryBudgetDto);
    } catch (error) {
      throw new HttpException(
        'Unexpected error occured',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  @Roles('ADMIN')
  async deleteCategoryBudget(@Param('id') id: string) {
    try {
      const categoryBudget = await this.categoryBudgetService.removeCategoryBudget(id);
      if (!categoryBudget) {
        throw new Error('CategoryBudget not found');
      }
      return categoryBudget;
    } catch (error) {
      throw new HttpException('CategoryBudget not found', HttpStatus.NOT_FOUND);
    }
  }
}
