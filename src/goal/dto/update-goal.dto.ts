import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from 'class-validator';

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

  @IsDate()
  @IsOptional()
  targetDate: Date;

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
