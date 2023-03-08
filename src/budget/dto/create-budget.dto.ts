import { IsInt, IsString } from 'class-validator';

export class CreateBudgetDto {
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
}
