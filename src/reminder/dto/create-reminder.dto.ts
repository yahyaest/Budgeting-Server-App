import { IsDate, IsInt, IsString } from 'class-validator';

export class CreateReminderDto {
  @IsDate()
  date: Date;

  @IsString()
  message: string;

  @IsString()
  type: 'DailyTransaction' | 'MonthlyBudget';

  @IsInt()
  userId: number;
}
