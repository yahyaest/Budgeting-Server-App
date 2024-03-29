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
import { JwtGuard, RolesGuard } from 'src/auth/guard';
import { CategoryService } from './category.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('api/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('')
  async getCategories(@Query() query: Object) {
    try {
      return await this.categoryService.getCategoriesWithParams(query);
    } catch (error) {
      throw new HttpException('No Categories found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('/:id')
  async getCategory(@Param('id') id: string) {
    try {
      const category = await this.categoryService.getCategoryById(id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }

  @Post('')
  @Roles('ADMIN')
  async addCategory(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      return await this.categoryService.addCategory(createCategoryDto);
    } catch (error) {
      console.log(error)
      throw new HttpException(
        error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch('/:id')
  @Roles('ADMIN')
  async updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    try {
      return await this.categoryService.updateCategory(id, updateCategoryDto);
    } catch (error) {
      console.log(error)
      throw new HttpException(
        error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete('/:id')
  @Roles('ADMIN')
  async deleteCategory(@Param('id') id: string) {
    try {
      const category = await this.categoryService.removeCategory(id);
      if (!category) {
        throw new Error('Category not found');
      }
      return category;
    } catch (error) {
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
    }
  }
}
