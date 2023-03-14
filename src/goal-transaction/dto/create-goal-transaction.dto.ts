import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGoalTransactionsDto {
  @IsString()
  month: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  amount: number;

  @IsInt()
  userId: number;

  @IsInt()
  goalId: number;
}
