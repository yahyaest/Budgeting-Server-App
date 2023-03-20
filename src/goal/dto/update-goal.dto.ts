import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateGoalDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsBoolean()
  @IsOptional()
  achieved: boolean;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  targetDate: string;

  @IsInt()
  @IsOptional()
  targetAmount: number;

  @IsInt()
  @IsOptional()
  currentAmount: number;

  @IsInt()
  @IsOptional()
  progress: number;

  @IsInt()
  @IsOptional()
  userId: number;
}
