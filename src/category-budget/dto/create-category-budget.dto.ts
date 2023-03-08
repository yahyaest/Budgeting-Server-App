import { IsInt, IsString } from 'class-validator';

export class CreateCategoryBudgetDto {
  @IsString()
  month: string;

  @IsString()
  year: string;

  @IsInt()
  targetBudget: number;

  @IsInt()
  currentBudget: number;

  @IsInt()
  userId: number;

  @IsInt()
  budgetId: number;

  @IsInt()
  categoryId: number;
}
