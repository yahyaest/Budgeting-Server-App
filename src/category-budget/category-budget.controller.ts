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
import { CategoryBudgetService } from './category-budget.service';
import { CreateCategoryBudgetDto, UpdateCategoryBudgetDto } from './dto';
import { CustomRequest } from 'src/user/models/request.models';

@UseGuards(JwtGuard)
@Controller('api/categories-budgets')
export class CategoryBudgetController {
  constructor(private readonly categoryBudgetService: CategoryBudgetService) {}

  @Get('')
  @UseGuards(DataAccessGuard)
  async getCategoryBudgets(@Query() query: any, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      if (user.role !== 'ADMIN') {
        query.userId = user.id;
      }
      return await this.categoryBudgetService.getCategoryBudgetsWithParams(
        query,
      );
    } catch (error) {
      throw new HttpException('No CategoryBudgets found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  @UseGuards(DataAccessGuard)
  async getCategoryBudget(@Param('id') id: string, @Req() req: CustomRequest) {
    try {
      const user = req.userObj;
      const categoryBudget =
        await this.categoryBudgetService.getCategoryBudgetById(id);
      if (!categoryBudget) {
        throw new Error('CategoryBudget not found');
      }
      if (user.id !== categoryBudget.userId && user.role !== 'ADMIN') {
        throw new Error('CategoryBudget belong to another user');
      }
      return categoryBudget;
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
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
  @UseGuards(DataAccessGuard)
  async updateCategoryBudget(
    @Param('id') id: string,
    @Body() updateCategoryBudgetDto: UpdateCategoryBudgetDto,
    @Req() req: CustomRequest,
  ) {
    try {
      const user = req.userObj;
      const categoryBudget =
        await this.categoryBudgetService.getCategoryBudgetById(id);

      if (!categoryBudget) {
        throw new Error('CategoryBudget not found');
      }

      if (user.id !== categoryBudget.userId && user.role !== 'ADMIN') {
        throw new Error('CategoryBudget belong to another user');
      }
      return await this.categoryBudgetService.updateCategoryBudget(
        id,
        updateCategoryBudgetDto,
      );
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('/:id')
  @UseGuards(DataAccessGuard)
  async deleteCategoryBudget(
    @Param('id') id: string,
    @Req() req: CustomRequest,
  ) {
    try {
      const user = req.userObj;
      const categoryBudget =
        await this.categoryBudgetService.getCategoryBudgetById(id);
      if (!categoryBudget) {
        throw new Error('CategoryBudget not found');
      }

      if (user.id !== categoryBudget.userId && user.role !== 'ADMIN') {
        throw new Error('CategoryBudget belong to another user');
      }
      return await this.categoryBudgetService.removeCategoryBudget(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
