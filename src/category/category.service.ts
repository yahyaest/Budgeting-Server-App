import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategories() {
    return await this.prisma.category.findMany();
  }

  async getCategoryById(id: string) {
    return await this.prisma.category.findUnique({ where: { id: +id } });
  }

  async getCategoriesWithParams(query: Object) {
    return await this.prisma.category.findMany({ where: query });
  }

  async addCategory(body: CreateCategoryDto) {
    return await this.prisma.category.create({ data: body });
  }

  async updateCategory(id: string, body: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id: +id },
      data: body,
    });
  }

  async removeCategory(id: string) {
    return await this.prisma.category.delete({ where: { id: +id } });
  }
}
