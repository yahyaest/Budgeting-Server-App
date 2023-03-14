import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateGoalTransactionsDto {
  @IsString()
  @IsOptional()
  month: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsOptional()
  amount: number;

  @IsInt()
  @IsOptional()
  userId: number;

  @IsInt()
  @IsOptional()
  goalId: number;
}
