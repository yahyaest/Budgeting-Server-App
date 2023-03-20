import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  date: string;

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
