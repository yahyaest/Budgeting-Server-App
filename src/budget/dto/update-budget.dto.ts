import { IsInt, IsString, IsOptional } from 'class-validator';

export class UpdateBudgetDto {
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
}
