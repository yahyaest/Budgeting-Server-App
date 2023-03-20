import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateReminderDto {
  @IsString()
  @IsOptional()
  date: string;

  @IsString()
  @IsOptional()
  message: string;

  @IsString()
  @IsOptional()
  type: 'DailyTransaction' | 'MonthlyBudget';

  @IsInt()
  @IsOptional()
  userId: number;
}
