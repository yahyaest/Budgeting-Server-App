import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateReminderDto {
  @IsString()
  date: string;

  @IsString()
  message: string;

  @IsString()
  @IsOptional()
  type: 'DailyTransaction' | 'MonthlyBudget';

  @IsInt()
  userId: number;
}
