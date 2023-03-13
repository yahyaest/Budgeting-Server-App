import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  date: Date;

  @IsInt()
  amount: number;

  @IsInt()
  userId: number;

  @IsInt()
  categoryId: number;

  @IsInt()
  @IsOptional()
  imageId: number;
}
