import { IsBoolean, IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  title: string;

  @IsBoolean()
  @IsOptional()
  achieved: boolean;

  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  targetDate: Date;

  @IsInt()
  targetAmount: number;

  @IsInt()
  currentAmount: number;

  @IsInt()
  progress: number;

  @IsInt()
  userId: number;
}
