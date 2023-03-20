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
import { Roles } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { CategoryBudgetService } from './category-budget.service';
import { CreateCategoryBudgetDto, UpdateCategoryBudgetDto } from './dto';

@UseGuards(JwtGuard)
@Controller('api/categories-budgets')
export class CategoryBudgetController {
  constructor(private readonly categoryBudgetService: CategoryBudgetService) {}

  @Get('')
  async getCategoryBudgets(@Query() query: Object) {
    try {
      return await this.categoryBudgetService.getCategoryBudgetsWithParams(
        query,
      );
    } catch (error) {
      throw new HttpException('No CategoryBudgets found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getCategoryBudget(@Param('id') id: string) {
    try {
      const categoryBudget =
        await this.categoryBudgetService.getCategoryBudgetById(id);
      if (!categoryBudget) {
        throw new Error('CategoryBudget not found');
      }
      return categoryBudget;
    } catch (error) {
      throw new HttpException('CategoryBudget not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  async addCategoryBudget(
    @Body() createCategoryBudgetDto: CreateCategoryBudgetDto,
  ) {
    try {
      return await this.categoryBudgetService.addCategoryBudget(
        createCategoryBudgetDto,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Patch('/:id')
  async updateCategoryBudget(
    @Param('id') id: string,
    @Body() updateCategoryBudgetDto: UpdateCategoryBudgetDto,
  ) {
    try {
      return await this.categoryBudgetService.updateCategoryBudget(
        id,
        updateCategoryBudgetDto,
      );
    } catch (error) {
      console.log(error)
      throw new HttpException(
        error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  async deleteCategoryBudget(@Param('id') id: string) {
    try {
      const categoryBudget =
        await this.categoryBudgetService.removeCategoryBudget(id);
      if (!categoryBudget) {
        throw new Error('CategoryBudget not found');
      }
      return categoryBudget;
    } catch (error) {
      throw new HttpException('CategoryBudget not found', HttpStatus.NOT_FOUND);
    }
  }
}
