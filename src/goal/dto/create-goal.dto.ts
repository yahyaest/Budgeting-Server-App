import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  title: string;

  @IsBoolean()
  @IsOptional()
  achieved: boolean;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  targetDate: string;

  @IsInt()
  targetAmount: number;

  @IsInt()
  currentAmount: number;

  @IsInt()
  progress: number;

  @IsInt()
  userId: number;
}
