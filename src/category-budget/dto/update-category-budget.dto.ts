import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateCategoryBudgetDto {
  @IsOptional()
  @IsString()
  month: string;

  @IsOptional()
  @IsString()
  year: string;

  @IsOptional()
  @IsInt()
  targetBudget: number;

  @IsOptional()
  @IsInt()
  currentBudget: number;

  @IsOptional()
  @IsInt()
  userId: number;

  @IsOptional()
  @IsInt()
  budgetId: number;

  @IsOptional()
  @IsInt()
  categoryId: number;
}
