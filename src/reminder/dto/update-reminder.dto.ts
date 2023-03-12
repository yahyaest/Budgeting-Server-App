import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateReminderDto {
  @IsOptional()
  @IsDate()
  date: Date;

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
